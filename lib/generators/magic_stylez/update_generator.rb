# encoding: utf-8
module MagicStylez
  module Generators
    class UpdateGenerator < ::Rails::Generators::Base
      include Thor::Actions
      require "magic_stylez/version"
      
      desc "Creates a corporate folder to customize magic-stylez."
      
      source_root("#{::MagicStylez::Rails::Engine.root}/app/assets/stylesheets/corporate")
      destination_root = "#{::Rails.root}/app/assets/stylesheets/corporate"
      
      def initial_desc
        puts(' *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   * ')
        puts(' -   -   -   -   -   -   -   -   -   -  M  A G I C  S T Y L E Z  -   -   -   -   -   -   -   -   -   - ')
        puts(' *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   * ')
      end
      
      def update_corporates
        puts("...")
        puts("... Updating Corporate-folder to version #{::MagicStylez::VERSION}")
        puts("...")
        if File.directory?("#{::Rails.root}/app/assets/stylesheets/corporate")
          Dir.glob("#{::MagicStylez::Rails::Engine.root}/vendor/assets/stylesheets/corporate/**/*").each do |fl|
            file_name = File.basename( fl )
            if file_name.match(/^_([a-z]*).scss$/)
              destination = "#{::Rails.root}/app/assets/stylesheets/corporate/#{file_name}"
              short_name = file_name.match(/^_([a-z]*).scss$/)[0]
              puts("check:  corporate/#{short_name}")
              if File.exists?( destination )
                diffrents = compare_style_file( file_name )
                if diffrents.present?
                  append_to_file destination, diffrents
                  puts("> add new variables")
                  puts("...")
                end
              else
                copy_file file_name, file_name
                puts("copied new file:  corporate/#{short_name}")
              end
            end
          end
        else
          puts("E R R O R !!!")
          puts("corporate folder doesn't exist!")
          puts("please run the install generator first.")
        end
        puts("...")
      end
      
      def end_desc
        puts("========================================================================================================")
        puts("-    -    -    -    -    -    -    -    M  A G I C  S T Y L E Z     -    -    -    -    -    -    -    -")
        puts("--------------------------------------------------------------------------------------------------------")
        puts("  .   .   .                               Version #{::MagicStylez::VERSION.to_s.ljust(10)}                                .   .   .   ")
        puts("  .   .   .                    http://berlinmagic.github.io/magic_stylez/                   .   .   .   ")
        puts("========================================================================================================")
      end
      
      private
        
        def compare_style_file( this )
          source = IO.readlines("#{::MagicStylez::Rails::Engine.root}/vendor/assets/stylesheets/corporate/#{this}").map(&:chomp)
          target = IO.readlines("#{::Rails.root}/app/assets/stylesheets/corporate/#{this}").map(&:chomp)
          # ---
          diffrents = source - target
          diffrents.reject! { |stl| stl.match(/^(?!\/\/.*).*\$([a-zA-Z0-9\-\_]*):.*$/) && target.find_index{ |x| x.match(/^(?!\/\/.*).*\$#{ stl.match(/^(?!\/\/.*).*\$([a-zA-Z0-9\-\_]*):.*$/) }:.*$/) } }
          diffrents = diffrents.map{ |d| "/* #{ (source.index(d) + 1).to_s.rjust(4) } */   #{d}" }
          additional = ""
          if diffrents.any?
            additional = <<-STYLES



// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
// magic_styles v-#{::MagicStylez::VERSION} additional variables (#{Time.zone.now.strftime("%Y-%m-%d %H:%M")})
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
// line  |   style
#{ diffrents.join("\n") }
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 


            STYLES
          end
          additional
        end
      
    end
  end
end