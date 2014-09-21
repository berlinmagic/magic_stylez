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

## NEW*

- **magic-styles update generator**
- in the process I often add new variables to the corporate files
(*what causes "Missing variable!" when you update to new version*)
- this generator adds all new variables without touching your settings
```ruby
$ rails g magic_stylez:update
```

#### Changes when update to <small>0.0.0.55</small>:</h4>
- *corporate/typo* is removed!
- *corporate/fonts* doesn't contain css anymore, just variables
With Version **0.0.0.55** I merged *corporate/typo* into *corporate/fonts* (they where so similar). I also removed all css from *corporate/fonts*, because it causes trouble with update generator (and also is not a variable).



### Thanks

A lot of code for this gem is taken from [bootstrap-sass](https://github.com/twbs/bootstrap-sass), so thank you guys for the great work. Same goes for bourbon thanks for a lightweight helper set.



### Authors

- Torsten Wetzel
- Austin Strange
- Marco Sebald
- many others ... (especially stackoverflow users)


#### License 

MIT-License
