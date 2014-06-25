@to_currency = ( number ) ->
  unless isNaN number
    (Math.round( parseFloat( number ) * 100 ) / 100).toFixed(2)
  else
    (0).toFixed(2)

@to_euro = (number) ->
  "#{to_currency(number)} €"

@to_dollar = (number) ->
  "$ #{to_currency(number)}"


$ ->
  
  # replace komma with dot (german uses komma instead of dot)
  $("body").on "keyup", "input.number_field", ->
    if jQuery(@).val().indexOf(",") isnt -1
      jQuery(@).val( jQuery(@).val().replace(',','.')  )