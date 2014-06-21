module MagicStylez
  module Rails
    class Engine < ::Rails::Engine
      initializer "magic-stylez.assets.precompile" do |app|
        # app.config.assets.precompile << %r(magic/magicons-regular-webfont\.(?:eot|svg|ttf|woff)$)
        # app.config.assets.precompile << %r(magic/orderlifticons-webfont\.(?:eot|svg|ttf|woff)$)
        
        config.assets.precompile += %w(*.png *.jpg *.jpeg *.gif)
        config.assets.precompile += %w(*.eot *.svg *.ttf *.woff)
        
        Sass.load_paths << stylesheets_path("bourbon")
        Sass.load_paths << stylesheets_path("bootstrap")
      end
    end
  end
end
