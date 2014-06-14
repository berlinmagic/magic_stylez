@renderView = ( path, options = {} ) ->
  try
    JST["views/#{ path }"]( options )
  catch error
    if App.Environment != 'production'
      console?.log "Partial[#{path}] => #{error}"
      "<p class='error'>Sorry, there is no partial named '#{ path }'.</p>"
    else
      ''