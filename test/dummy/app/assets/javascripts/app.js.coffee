$ ->

  $("body").on "click", ".lst_lnk", ->
    # nav = $(@).closest(".nav")
    nav = $(@).closest(".nav_list")
    nul = $(@).closest("ul")
    nav.find("li.active").removeClass("active")
    if nav == nul
      nav.find("li.current").removeClass("current")
    else
      nul.find("li.current").removeClass("current")
    $(@).closest("li").addClass("current")
    $(@).closest("li").addClass("active")
    return false if $(@).attr("href") == "#"
  
  
  $("body").on "click", ".app_lnk", ->
    path = $(@).attr("data-target")
    path = "" if path == undefined
    # $("#app_content").html( $(renderView( path )) )
    window.location.hash = path
    
  # $(window).on 'hashchange', ->
  #   path = window.location.hash.replace(/#/, "")
  #   $("#app_content").html( $(renderView( path )) )
  
  $(window).on 'popstate', ->
    console.log "Popstate"
    path = window.location.hash.replace(/#/, "")
    if path != ""
      $("#app_content").html( $(renderView( path )) )
    else
      $("#app_content").html( $(renderView( "app/start" )) )
    lnk = $(".app_lnk[data-target='#{path}']").closest("li")
    nav = lnk.closest(".nav_list")
    nul = lnk.closest("ul")
    nav.find("li.active").removeClass("active")
    nav.find("li.current").removeClass("current")
    if nav == nul
      lnk.addClass("current")
    else
      nul.closest("li").addClass("current")
    lnk.addClass("active")