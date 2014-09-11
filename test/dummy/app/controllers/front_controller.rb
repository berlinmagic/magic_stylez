class FrontController < ApplicationController
  
  TEMPLATES = %w(slidebar-header slidebar-subnav fixed-header aside-nav fixed-subnav)
  
  def start
    Rails.logger.info "Front - Start"
  end
  
  def templates
    Rails.logger.info "Front - templates"
    if params[:template] && TEMPLATES.include?(params[:template].to_s)
      render "templates/#{params[:template]}", layout: "blank"
    else
      render "templates/responsive-slidebar", layout: "blank"
    end
  end
  
end
