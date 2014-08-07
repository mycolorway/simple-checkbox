class Checkbox extends Widget

  opts:
    el:""


  _init: ->
    @checked = false
    @checkbox = $(@opts.el).first()
    throw new Error "必须提供一个有效的选择符" if @checkbox.length == 0
    @render()

  render: ->
    @checkbox.css('display','none')

    @el = $('<div class="simple-checkbox"></div>').insertAfter @checkbox
    @el.append @checkbox

    @_bind()

  _bind: ->
    @el.hover \
      =>
        if @checked
          @changeStatus "checked-hover"
        else
          @changeStatus "hover"
      ,
      =>
        if @checked
          @changeStatus "checked"
        else
          @changeStatus "normal"


    @el.mousedown =>
      if @checked
        @changeStatus "checked-active"
      else
        @changeStatus "active"

    @el.mouseup =>
      if @checked
        @check false
      else
        @check true

  changeStatus: (status)->
    @el.removeClass()
    @el.addClass "simple-checkbox"
    @el.addClass status


  check: (checked)->
    return @checked unless checked?
    @checked = checked
    if checked
      @changeStatus "checked"
      @el.trigger "checked"
      @checkbox.attr "checked","checked"
    else
      @changeStatus "normal"
      @el.trigger "unchecked"
      @checkbox.removeAttr "checked"

  destroy: ->
    @checkbox.css("display","inline-block")
    @el.remove()


window.simple ||= {}

simple.checkbox = (opts)->
  new Checkbox(opts)





