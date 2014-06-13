module MagicStylez
  module Rails
    class Engine < ::Rails::Engine
      initializer "magic-stylez.assets.precompile" do |app|
        # app.config.assets.precompile << %r(magic/magicons\.(?:eot|svg|ttf|woff)$)
      end
    end
  end
end
