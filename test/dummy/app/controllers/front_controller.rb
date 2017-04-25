class FrontController < ApplicationController
  
  TEMPLATES = %w(slidebar-header slidebar-subnav fixed-header aside-nav fixed-subnav)
  
  def start
    Rails.logger.info "Front - Start"
    @show_dev_bar = true
  end
  
  def templates
    Rails.logger.info "Front - templates"
    if params[:template] && TEMPLATES.include?(params[:template].to_s)
      render "templates/#{params[:template]}", layout: "blank"
    else
      render "templates/slidebar-header", layout: "blank"
    end
  end
  
  def cache
    directory = "#{Rails.root}/public/html/"
    TEMPLATES.each do |tmpl|
      File.open(File.join(directory, "#{tmpl}.html"), 'w') do |f|
        f.puts render_to_string("templates/#{tmpl}", layout: "blank")
      end
    end
    File.open(File.join(directory, "index.html"), 'w') do |f|
      f.puts render_to_string("front/start")
    end
    redirect_to root_path, notice: "Caching is done!"
  end
  
end
