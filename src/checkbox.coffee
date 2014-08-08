class Checkbox extends Widget

  opts:
    el:""


  _init: ->
    @checkbox = $(@opts.el).first()
    throw new Error "Error!Please provide a valid selector" if @checkbox.length == 0
    @checked = @checkbox.prop "checked"
    @_render()

  _render: ->
    @checkbox.hide()

    @el = $('<div class="simple-checkbox"></div>').insertAfter @checkbox
    @el.append @checkbox

    @check @checked
    @_bind()

  _bind: ->
    @el.hover \
      =>
        @el.addClass "hover"
      ,
      =>
        @el.removeClass "hover"


    @el.mousedown =>
      @el.addClass "pressed"

    @el.click =>
      @el.removeClass "pressed"
      if @checked
        @check false
      else
        @check true

  check: (checked)->
    return @checked unless checked?
    @checked = checked
    if checked
      @el.addClass "checked"
      @el.trigger "checked"
      @checkbox.prop "checked",true
    else
      @el.removeClass "checked"
      @el.trigger "unchecked"
      @checkbox.prop "checked",false

  destroy: ->
    @checkbox.show()
    @el.remove()


window.simple ||= {}

simple.checkbox = (opts)->
  new Checkbox(opts)





