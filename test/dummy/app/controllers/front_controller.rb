class FrontController < ApplicationController
  
  def start
    Rails.logger.info "Front - Start"
  end
  
  def templates
    Rails.logger.info "Front - templates"
    render "templates/#{params[:template]}", layout: "blank"
  end
  
end
