$ ->
  $("body").on "click", ".navbar.fixed-slidebar .collapse", (ev) ->
    ev.preventDefault()
    log "yea"