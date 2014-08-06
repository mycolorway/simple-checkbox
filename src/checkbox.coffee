class Checkbox extends Widget

  #number represents the image order in the sprite
  @status=
    "normal":1
    "hover":2
    "active":3
    "checked":4
    "checked-hover":5
    "checked-active":6
    "disabled":7


  opts:
    ##images are normal,hover,active,checked,checked-hover,checked-active,disabled
    spriteUrl:"image/checkbox.png"
    size:16 # single image size
    gap:4  #px between two images in sprite


  _init: ->
    @checked=false
    @$origin=$(@opts.el)
    @render()

  render: ->
    @$origin.css('display','none')

    @$checkbox=$('<div class="simple-checkbox"></div>').insertAfter(@$origin)
    @$checkbox.css("background-image","url("+@opts.spriteUrl+")")
    @$checkbox.width(@opts.size).height(@opts.size)

    @handleEvent()

  handleEvent: ->
    @$checkbox.hover \
      =>
        if @checked
          @changeImage "checked-hover"
        else
          @changeImage "hover"
      ,
      =>
        if @checked
          @changeImage "checked"
        else
          @changeImage "normal"


    @$checkbox.mousedown =>
      if @checked
        @changeImage "checked-active"
      else
        @changeImage "active"

    @$checkbox.mouseup =>
      if @checked
        @check false
      else
        @check true

  changeImage: (s)->
    number=Checkbox .status[s]
    y=(@opts.size+@opts.gap)*(number-1)
    @$checkbox.css("backgroundPosition","0px #{-y}px")

  check: (checked)->
    return @checked unless checked?
    @checked=checked
    if checked
      @changeImage "checked"
      @$checkbox.trigger "checked"
    else
      @changeImage "normal"
      @$checkbox.trigger "unchecked"

  destroy: ->
    @$origin.css("display","inline-block")
    @$checkbox.remove()


window.simple ||= {}

simple.checkbox=(opts)->
  return unless opts? and opts.el?
  new Checkbox(opts)





