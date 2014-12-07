class Checkbox extends SimpleModule

  opts:
    el:""
    size: 18
    animation: false

  _tpl: '''
  <div class="simple-checkbox">
    <div class="checkbox-container">
      <div class="checkbox-tick">
      </div>
    </div>
    <div class="checkbox-ripple"></div>
  </div>
  '''

  _init: ->
    @checkbox = $(@opts.el).first()
    throw new Error "simple-checkbox: el option is invalid" if @checkbox.length == 0

    checkbox = @checkbox.data "simple-checkbox"
    checkbox.destroy() if checkbox

    @checked = @checkbox.prop "checked"
    @_render()

  _render: ->
    @checkbox.hide()

    @el = @checkbox.parent '.simple-checkbox'
    if @el.length < 1
      @el = $(@_tpl).insertAfter @checkbox
      @el.append @checkbox
      @checkbox.addClass 'checkbox-input'

      @el.css
        height: @opts.size
        width: @opts.size
      @el.find('.checkbox-container')
        .css
          border: 0.12 * @opts.size + 'px solid'

      @el.find('.checkbox-tick')
        .css
          'border-right': 0.15 * @opts.size + 'px solid'
          'border-bottom': 0.15 * @opts.size + 'px solid'


    unless @opts.animation
      @el.find('.checkbox-ripple').remove()

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
      @_startAnimate() if @opts.animation
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

  _startAnimate: ->
    return if @el.hasClass 'animation-start animation-end'
    @el.addClass 'animation-start'
    @el.find('.checkbox-ripple').one 'animationend webkitAnimationEnd oAnimationEnd' , =>
      if @el.hasClass('pressed')
        @el.one 'mouseup', =>
          @_endAnimate()
        return
      @_endAnimate()


  _endAnimate: =>
    @el.addClass('animation-end')
    @el.find('.checkbox-ripple').one 'animationend webkitAnimationEnd oAnimationEnd', =>
      @el.removeClass('animation-start animation-end')

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





