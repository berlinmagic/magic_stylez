class FrontController < ApplicationController
  
  def start
    Rails.logger.info "Front - Start"
  end
  
  def templates
    Rails.logger.info "Front - templates"
    if params[:template] && %w(responsive-slidebar fixed-header).include?(params[:template].to_s)
      render "templates/#{params[:template]}", layout: "blank"
    else
      render "templates/responsive-slidebar", layout: "blank"
    end
  end
  
end
