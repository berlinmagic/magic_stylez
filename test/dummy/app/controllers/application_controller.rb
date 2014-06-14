class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  require "action_controller/page_caching"
  
  include ActionController::Caching
  # self.page_cache_directory = "#{Rails.root.to_s}/public/page_cache"
  self.page_cache_directory = Rails.public_path
  self.perform_caching = true
  self.cache_store = ActionController::Base.cache_store
  
end
