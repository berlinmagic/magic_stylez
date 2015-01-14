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

build_paralax = (el) ->
  console.log "build_paralax", el
  ## Create the background image holder ##
  el.prepend("<div class='px_bg_holder'></div>")
  el.find(".px_bg_holder").css(
    "background-image" : el.css("background-image")
    "background-position" : "center center"
    "background-repeat" : "no-repeat"
    "background-size" : "cover"
    "position" : "absolute"
    "height" : $(window).height()
    "width" : $(window).width()
  )
  ## We will remove the background at all ##
  el.css("background","none")
  el.css("overflow","hidden")
  
  $("body").scroll ->
    console.log "Scrolling"
    # bg_pos = $("#app_content").offset().top + el.offset().top;
    console.log if el.hasClass("responsive-hero") then el.closest(".fullpage-table").position().top else el.position().top
    bg_pos = ($("#app_content").offset().top + if el.hasClass("responsive-hero") then el.closest(".fullpage-table").position().top else el.position().top)
    console.log "bg_pos #{ bg_pos }"
    if bg_pos < $(window).height()
      bg_pos = bg_pos - (bg_pos / 10)
    
    el.find(".px_bg_holder").css(
      "top" : "#{ bg_pos * -1 }px"
    )
  $(window).resize ->
    $(".px_bg_holder").css(
      "height" : $(window).height()
      "width" : $(window).width()
    )


load_paralax = ->
  if $(".section.image.fixed").length > 0
    $(".section.image.fixed").each ->
      build_paralax( $(@) )

  if $(".responsive-hero.fixed-bg").length > 0
    $(".responsive-hero.fixed-bg").each ->
      build_paralax( $(@) )






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
  load_paralax()
  $("#current-view-name").text( lnk.text() )
  currentPath = path
    
  

$ ->

  navigate()
  
  $(document).scroll ->
    console.log "window SCROLL"
  
  $("body").scroll ->
    console.log "app_content SCROLL"

  $("#main_template").scroll ->
    console.log "main_template SCROLL"



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
    