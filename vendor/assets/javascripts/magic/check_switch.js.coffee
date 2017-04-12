$ ->
  
  $('body').on 'click', '.check_switch', (event) ->
    if $(@).hasClass("active")
      $(@).removeClass("active")
      $(@).find("input").prop(checked: false)
    else
      $(@).addClass("active")
      $(@).find("input").prop(checked: true)
    # $(@).closest("form").find(".btn.hidden").hide().removeClass("hidden").show()
    # $(@).closest("form").find(".btn.disabled").hide().removeClass("disabled").show()

  
  $('body').on 'click', '.radio_switch', (event) ->
    if $(@).attr("data-radio")
      radios = $(".radio_switch.#{ $(@).attr("data-radio") }")
    else
      radios = $(".radio_switch")
    radios.each ->
      $(@).removeClass("active")
      $(@).find("input").prop(checked: false)
      $(@).find("input").trigger("change")
    $(@).addClass("active")
    $(@).find("input").prop(checked: true)
    $(@).find("input").trigger("change")