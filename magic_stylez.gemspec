$:.push File.expand_path("../lib", __FILE__)
require "magic_stylez/version"


Gem::Specification.new do |s|
  s.name        = "magic_stylez"
  s.version     = MagicStylez::VERSION
  s.authors     = ["Torsten Wetzel"]
  s.email       = ["torstenwetzel@berlinmagic.com"]
  s.homepage    = "http://berlinmagic.github.io/magic_stylez/"
  s.summary     = "A set of sass helper depending on bourbon and bootstrap-sass."
  s.description = "Lots of styles and helpers we used for several projects."
  s.license     = "MIT"

  # s.files = Dir["{lib,vendor}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]
  # s.test_files = Dir["test/**/*"]
  s.files      = `git ls-files`.split("\n")
  s.test_files = `git ls-files -- test/*`.split("\n")

  # s.add_dependency "rails", "~> 4.1.1"
  
  s.add_dependency "rails", ">= 3.1.0"
  s.add_dependency 'autoprefixer-rails',  '>= 1.1'
  s.add_dependency 'sass',                '>= 3.2'
  ## since 3.2.x bootstrap-sass changed the asset structure, so first stay with 3.1.1.1
  s.add_dependency 'bootstrap-sass',      '3.1.1.1'
  s.add_dependency 'bourbon',             '>= 3.0.0'
  
   # Testing dependencies
  s.add_development_dependency 'test-unit',       '>= 2.5.5'
  # Dummy Rails app dependencies
  s.add_development_dependency 'json',            '>= 1.8.1'
  s.add_development_dependency 'sprockets-rails', '>= 2.1.3'
  s.add_development_dependency 'jquery-rails',    '>= 3.1.0'
  s.add_development_dependency 'coffee-rails'
  s.add_development_dependency 'eco'
  s.add_development_dependency 'uglifier'
  s.add_development_dependency "sqlite3"
end
