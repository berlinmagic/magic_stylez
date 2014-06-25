class CircleDiagram
  
  constructor: (options) ->
    @opt      = if options then options else {}
    @options  = $.extend {}, defaults, @opt
    # @circle = $(@options.circle)
    @circle   = @options.circle
    @el       = @circle.find(@options.el)
    @percent  = @options.percent
    @degree   = @options.deg
    @rotating = @options.rotating
    @timer    = @options.timer
    @setup()
    


  defaults =
    el:             '.inner_half_one'
    circle:         '.circle-diagram'
    percent:        0
    deg:            0
    rotating:       false
    precision:      "ungenau"
    timeStep:       20
    fastStep:       5
    slowStep:       50
    timer:          undefined


  rotate: ->
    @clean_percent
    @set_rotation @percent
    @timer = setTimeout(->
      ++@percent
      @rotate()
    , @options.timeStep)


  rotate_to: (value) =>
    @clean_percent
    # console?.log? "rotate_to ::: #{@percent}% (#{@degree}°) -- #{value}"
    deg = parseInt( 360 / 100 * value )
    @set_rotation @percent, @degree
    unless @degree is deg
      if @degree < deg
        new_value = @degree + 1
        timerStep = deg - @degree
      else
        new_value = @degree - 1
        timerStep = @degree - deg
      @degree = new_value
      if @options.precision is "genau"
        @percent = ( Math.round( new_value / 360 * 100 * 10 ) / 10 ).toFixed(1)
      else
        @percent = parseInt( new_value / 360 * 100 )
      @timer = setTimeout(=>
        @rotate_to(value)
      , @getTimeStep(timerStep))
    else
      clearTimeout @timer
      @set_rotation value, @degree
      


  set_rotation: (value, deg) =>
    circ = deg + 90
    
    # $elie.css WebkitTransform: "rotate(" + circ + "deg)"
    @el.css "-webkit-transform": "rotate(" + circ + "deg)"
    @el.css "-moz-transform": "rotate(" + circ + "deg)"
    @el.css "-ms-transform": "rotate(" + circ + "deg)"
    @el.css "-o-transform": "rotate(" + circ + "deg)"
    @el.css "transform": "rotate(" + circ + "deg)"
    
    @circle.attr "data-deg", deg
    @circle.attr "data-percent", value
    
    if @options.precision is "genau"
      @circle.find(".middle_full").html (Math.round(value * 10) / 10).toFixed(1) + " %"
    else
      @circle.find(".middle_full").html parseInt(value) + " %"
      
    if deg >= 180
      @circle.addClass "halfplus"
    else
      @circle.removeClass "halfplus"

  clean_percent: ->
    @percent = @percent - 100 if @percent > 100
    @percent



  setup: ->
    percent = parseInt( @circle.attr("data-percent") ) or 0
    @rotate_to percent unless percent is @percent




  getTimeStep: (valu) ->
    if valu > 60
      @options.fastStep
    else if valu > 18
      @options.timeStep
    else
      @options.slowStep


window.CircleDiagram = CircleDiagram

# $(".animate_knopf").click ->
#   console.log "klicked"
#   if rotating
#     clearTimeout timer
#     rotating = false
#   else
#     rotate()
#     rotating = true
# 
# $(".set_deg_knopf").click ->
#   console.log "klicked"
#   rotate_to parseInt($("#wished_deg").val())
#   $("#wished_percent").val $("#wished_deg").val() / 360 * 100
# 
# $(".set_percent_knopf").click ->
#   console.log "klicked"
#   field = $(@).closest("tr").find(".wished_percent")
#   newval = parseInt( field.val() )
#   window.circles[ parseInt( field.attr("data-circle") ) ].rotate_to newval





# $ ->
#   if $('.circle-diagram').length > 1
#     window.circles = {}
#     count = 0
#     $('.circle-diagram').each ->
#       window.circles[count] = new CircleDiagram( circle: $(@) )
#       count = count + 1
#   else if $('.circle-diagram').length > 0
#     window.circleDiagram = new CircleDiagram( circle: $('.circle-diagram') )

        
        

