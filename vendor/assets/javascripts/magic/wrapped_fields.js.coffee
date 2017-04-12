## nice labeled inputs

labelHander = (input) ->
  label = input.closest('label')
  window.setTimeout (->
    hasValue = if input.val().length > 0 then true else false
    if hasValue
      label.addClass "has-value"
    else
      label.removeClass "has-value"
    return
  ), 10
  return

$ ->
  
  if $("label.wrapping").length > 0
    $("label.wrapping input, label.wrapping select").each ->
      labelHander( $(@) )
  $("body").on "focus", "label.wrapping input, label.wrapping select", ->
    inpt = $(@)
    inpt.closest('label').addClass "has-focus"
    labelHander inpt
  $("body").on "keydown", "label.wrapping input", ->
    labelHander( $(@) )
  $("body").on "change", "label.wrapping select", ->
    labelHander( $(@) )
  $("body").on "blur", "label.wrapping input, label.wrapping select", ->
    inpt = $(@)
    inpt.closest('label').removeClass "has-focus"
    labelHander inpt
