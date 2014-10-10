class Checkbox extends SimpleModule

  opts:
    el:""

  _init: ->
    @checkbox = $(@opts.el).first()
    throw new Error "Error!Please provide a valid selector" if @checkbox.length == 0
    return if @checkbox.data "simple-checkbox"
    @checked = @checkbox.prop "checked"
    @_render()

  _render: ->
    @checkbox.hide()

    @el = @checkbox.parent '.simple-checkbox'
    if @el.length < 1
      @el = $('<div class="simple-checkbox"></div>').insertAfter @checkbox
      @el.append @checkbox

    @disable() if @checkbox.prop("disabled")
    @check @checked

    @checkbox.data "simple-checkbox", @
    @el.data "simple-checkbox", @
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
      $(document).one "mouseup",(e)=>
        @el.removeClass "pressed"
      false

    @el.click =>
      return if @el.hasClass("disabled")
      if @checked
        @check false
        @el.trigger "unchecked"
      else
        @check true
        @el.trigger "checked"
      false

  check: (checked)->
    return @checked if !checked?
    @checked = checked
    if checked
      @el.addClass "checked"
      @checkbox.prop "checked",true
    else
      @el.removeClass "checked"
      @checkbox.prop "checked",false

  destroy: ->
    @checkbox.insertAfter(@el).show()
    @checkbox.removeData "simple-checkbox"
    @el.remove()

  disable: ->
    @checkbox.prop "disabled",true
    @el.addClass "disabled"

  enable: ->
    @checkbox.prop "disabled",false
    @el.removeClass "disabled"

checkbox = (opts)->
  new Checkbox(opts)





