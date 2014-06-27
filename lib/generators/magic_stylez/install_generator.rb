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
        empty_directory "app/assets/stylesheets/corporate"
        %w(colors fonts typo variables).each do |that|
          copy_file "vendor/assets/stylesheets/corporate/_#{that}.scss", "app/assets/stylesheets/corporate/_#{that}.scss"
        end
        puts("...")
      end
      
      def end_desc
        puts("========================================================================================================")
        puts("-    -    -    -    -    -    -    -    M  A G I C  S T Y L E Z     -    -    -    -    -    -    -    -")
        puts("--------------------------------------------------------------------------------------------------------")
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
        puts("  .   .   .   -> check the documentation for possible stuff                                 .   .   .   ")
        puts("  .   .   .                                                                                 .   .   .   ")
        puts("  .   .   .        http://berlinmagic.github.io/magic_stylez/                               .   .   .   ")
        puts("  .   .   .                                                                                 .   .   .   ")
        puts("========================================================================================================")
      end
      
    end
  end
end