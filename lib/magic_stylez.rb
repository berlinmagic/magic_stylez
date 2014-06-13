#
# Code from twbs/bootstrap/sas
#
module MagicStylez
  class << self
    # Inspired by Kaminari
    def load!
      require 'bootstrap-sass/sass_functions'
      if rails?
        register_rails_engine
      end
    end

    # Paths
    def gem_path
      @gem_path ||= File.expand_path '..', File.dirname(__FILE__)
    end

    def stylesheets_path
      File.join assets_path, 'stylesheets'
    end

    def fonts_path
      File.join assets_path, 'fonts'
    end

    def javascripts_path
      File.join assets_path, 'javascripts'
    end

    def assets_path
      @assets_path ||= File.join gem_path, 'vendor', 'assets'
    end

    # Environment detection helpers
    def asset_pipeline?
      defined?(::Sprockets)
    end

    def rails?
      defined?(::Rails)
    end

    private

    def register_rails_engine
      require 'bootstrap-sass/engine'
      require 'autoprefixer-rails'
    end
  end
end

MagicStylez.load!
