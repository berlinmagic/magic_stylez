require "bourbon"
require "bootstrap-sass"

module MagicStylez
  module Rails
    class Engine < ::Rails::Engine
      initializer "magic-stylez.assets.precompile" do |app|
        
        # compile pictures (this way also from vendor)
        app.config.assets.precompile += %w(*.png *.jpg *.jpeg *.gif)
        
        # compile fonts (this way also from vendor)
        app.config.assets.precompile += %w(*.eot *.svg *.ttf *.woff)
        
      end
    end
  end
end
