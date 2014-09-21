currentPath = ""

loadCircles = ->
  if $('.circle-diagram').length > 1
    window.circles = {}
    count = 0
    $('.circle-diagram').each ->
      window.circles[count] = new CircleDiagram( circle: $(@) )
      count = count + 1
  else if $('.circle-diagram').length > 0
    window.circleDiagram = new CircleDiagram( circle: $('.circle-diagram') )



navigate = ->
  path = window.location.hash.replace(/#/, "")
  if path != currentPath
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
  $("body").removeClass("aside-on")
  loadCircles()
  $("#current-view-name").text( lnk.text() )
  currentPath = path
    
  

$ ->
  $("body").on "click", "#mobile_header", ->
    $("body").toggleClass("aside-on")
    false

  $("body").on "click", ".hide_da_notice", ->
    $("body").toggleClass("with_important_notice")
    false

  $("body").on "click", ".get_some_borders", ->
    $("#nav-aside").toggleClass("bordered")
    false

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
  #   console.log "hashchange", window.location.pathname
  #   navigate()
  
  $(window).on 'popstate', ->
    console.log "Popstate", window.location.pathname
    navigate()
    