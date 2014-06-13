$:.push File.expand_path("../lib", __FILE__)
require "magic_stylez/version"


Gem::Specification.new do |s|
  s.name        = "magic_stylez"
  s.version     = MagicStylez::VERSION
  s.authors     = ["Torsten Wetzel"]
  s.email       = ["torstenwetzel@berlinmagic.com"]
  s.homepage    = "TODO"
  s.summary     = "A set of sass helper depending on bourbon and bootstrap-sass."
  s.description = "Lots of styles and helpers we used for several projects."
  s.license     = "MIT"

  s.files = Dir["{lib,vendor}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]
  s.test_files = Dir["test/**/*"]
  # => s.files      = `git ls-files`.split("\n")
  # => s.test_files = `git ls-files -- test/*`.split("\n")

  # s.add_dependency "rails", "~> 4.1.1"
  
  s.add_dependency "rails", ">= 3.1.0"
  s.add_runtime_dependency 'sass',            '~> 3.2'
  s.add_runtime_dependency 'bootstrap-sass',  '~> 3.1.1'
  s.add_runtime_dependency 'bourbon',         '~> 4.0.2'

  s.add_development_dependency "sqlite3"
end
