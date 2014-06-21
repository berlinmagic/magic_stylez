require "bourbon"
require "bootstrap-sass"

module MagicStylez
  module Rails
    class Engine < ::Rails::Engine
      initializer "magic-stylez.assets.precompile" do |app|
        # app.config.assets.precompile << %r(magic/magicons-regular-webfont\.(?:eot|svg|ttf|woff)$)
        # app.config.assets.precompile << %r(magic/orderlifticons-webfont\.(?:eot|svg|ttf|woff)$)
        
        config.assets.precompile += %w(*.png *.jpg *.jpeg *.gif)
        config.assets.precompile += %w(*.eot *.svg *.ttf *.woff)
        
        
        # config.sass.load_paths << stylesheets_path("bourbon")
        # config.sass.load_paths << stylesheets_path("bootstrap")
        # config.sass.load_paths << javascripts_path("bootstrap")
      end
    end
  end
end
