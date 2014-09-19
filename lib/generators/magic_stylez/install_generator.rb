# encoding: utf-8
module MagicStylez
  module Generators
    class InstallGenerator < ::Rails::Generators::Base
      include Thor::Actions
      
      desc "Creates a corporate folder to customize magic-stylez."
      
      source_root("#{::MagicStylez::Rails::Engine.root}")
      destination_root = "#{::Rails.root}"
      
      def initial_desc
        puts(' *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   * ')
        puts(' -   -   -   -   -   -   -   -   -   -  M  A G I C  S T Y L E Z  -   -   -   -   -   -   -   -   -   - ')
        puts(' *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   * ')
      end
      
      def copy_corporate
        puts("...")
        if File.directory?("#{::Rails.root}/app/assets/stylesheets/corporate")
          puts("...  C A U T I O N !!!")
          puts("...")
          puts("...  please use update generator (rails g magic_stylez:update) to keep your changes!")
          puts("...")
        else
          empty_directory "app/assets/stylesheets/corporate"
          Dir.glob("#{::MagicStylez::Rails::Engine.root}/vendor/assets/stylesheets/corporate/**/*").each do |fl|
            file_name = File.basename( fl )
            if file_name.match(/^_([a-z]*).scss$/)
              puts("add file:   corporate/#{file_name.match(/^_([a-z]*).scss$/)[0]}")
              copy_file "vendor/assets/stylesheets/corporate/#{file_name}", "app/assets/stylesheets/corporate/#{file_name}"
            end
          end
          puts("...")
          end_desc
        end
      end
      
      
      private
        
        def end_desc
          puts("========================================================================================================")
          puts("-    -    -    -    -    -    -    -    M  A G I C  S T Y L E Z     -    -    -    -    -    -    -    -")
          puts("--------------------------------------------------------------------------------------------------------")
          puts("  .   .   .                               Version #{::MagicStylez::VERSION.to_s.ljust(10)}                                .   .   .   ")
          puts("  .   .   .                    http://berlinmagic.github.io/magic_stylez/                   .   .   .   ")
          puts("  .   .   .                                                                                 .   .   .   ")
          puts("  .   .   .   T O D O s:                                                                    .   .   .   ")
          puts("  .   .   .                                                                                 .   .   .   ")
          puts("  .   .   .   -> add magic-styles to your app's stylesheets!                                .   .   .   ")
          puts("  .   .   .                                                                                 .   .   .   ")
          puts("  .   .   .        sass:     @import 'magic-stylez'; // import all                          .   .   .   ")
          puts("  .   .   .                  @import 'magic-min';    // import basic                        .   .   .   ")
          puts("  .   .   .                                                                                 .   .   .   ")
          puts("  .   .   .        css:      //= 'magic-stylez';     // import all                          .   .   .   ")
          puts("  .   .   .                  //= 'magic-min';        // import basic                        .   .   .   ")
          puts("  .   .   .                                                                                 .   .   .   ")
          puts("  .   .   .                                                                                 .   .   .   ")
          puts("  .   .   .   -> add magic-styles to your app's javascripts!                                .   .   .   ")
          puts("  .   .   .                                                                                 .   .   .   ")
          puts("  .   .   .        //= 'magic-stylez';     // import all                                    .   .   .   ")
          puts("  .   .   .        //= 'magic-min';        // import basic                                  .   .   .   ")
          puts("  .   .   .                                                                                 .   .   .   ")
          puts("========================================================================================================")
        end
      
    end
  end
end