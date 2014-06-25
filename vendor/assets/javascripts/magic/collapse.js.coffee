$ ->
  $("body").on "click", ".navbar-slidebar .navbar-toggle", (ev) ->
    ev.preventDefault()
    $(@).closest(".navbar-slidebar").find(".navbar-collapse").toggleClass("on")
    false

  # $("body").on "click", ".navbar .slidebar-toggle", (ev) ->
  #   ev.preventDefault()
  #   header = $(@).closest(".navbar-slidebar")
  #   slidebar = header.find(".navbar-collapse")
  #   slidebar.toggleClass("on")