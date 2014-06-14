#= require magic/render_eco

icon = (icn) ->
  "<i class='icon icon-#{icn}'></i>"

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
    $("#app_content").html( $(renderView( $(@).attr("data-target") )) )
    