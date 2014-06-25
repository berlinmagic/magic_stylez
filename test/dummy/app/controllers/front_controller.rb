class FrontController < ApplicationController
  
  TEMPLATES = %w(responsive-slidebar fixed-header)
  
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
