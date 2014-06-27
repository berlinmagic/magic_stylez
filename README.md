# magic-stylez

*Some style helpers used in a lot of our apps.*


## dependencies

- [bootstrap-sass](https://github.com/twbs/bootstrap-sass)
- [bourbon](http://bourbon.io/)


## Usage

- add the gem 
```ruby
  gem "magic_stylez"
```
- run the generator
```ruby
  $ rails g magic_stylez:install
```
- add to stylesheets
```sass
  @import 'magic-stylez'; // import all
  @import 'magic-min';    // import basic
```
```css
  //= 'magic-stylez'; /* import all */
  //= 'magic-min';    /* import basic */
```
- add to javascripts:
```javascript
  //= 'magic-stylez'; /* import all */
  //= 'magic-min';    /* import basic */
```



### Thanks

A lot of code for this gem is taken from [bootstrap-sass](https://github.com/twbs/bootstrap-sass), so thank you guys for the great work. Same goes for bourbon thanks for a lightweight helper set.



### Authors

- Torsten Wetzel
- Austin Strange
- Marco Sebald
- many others ... (especially stackoverflow users)


#### License 

MIT-License
