describe 'checkbox', ->
  opts=
    el:'#checkbox'

  beforeEach ->
    $('<input id="checkbox" type="checkbox">').appendTo 'body'

  afterEach ->
    checkbox = $('#checkbox').data 'simple-checkbox'
    checkbox?.destroy()
    $('#checkbox').remove()

  it 'should render specific DOM when init', ->
    simple.checkbox opts
    expect($('div.simple-checkbox')).toExist()
    expect($('.simple-checkbox>.checkbox-container>.checkbox-tick')).toExist()
    expect($('.simple-checkbox #checkbox')).toExist()
    expect($('#checkbox').css('display')).toBe('none')

  it 'should change size when size opt provide', ->
    newOpts = $.extend(opts, {size: 25})
    simple.checkbox newOpts
    expect($('.simple-checkbox').height()).toBe(25)
    expect($('.simple-checkbox').width()).toBe(25)

  it 'should throw an exception when opts is not provided', ->
    testException = ->
      simple.checkbox()
    expect(testException).toThrow()

  it 'should change class, when different function invoke', ->
    checkbox = simple.checkbox opts
    checkbox.check true
    $checkbox = $('.simple-checkbox')
    expect($checkbox).toHaveClass('checked')

    checkbox.check false
    expect($checkbox).not.toHaveClass('checked')

    checkbox.disable()
    expect($checkbox).toHaveClass('disabled')

    checkbox.enable()
    expect($checkbox).not.toHaveClass('disabled')

  it 'should change class, then different event triggered', ->
    checkbox = simple.checkbox opts
    $checkbox = $('.simple-checkbox')
    $checkbox.trigger 'click'
    expect($checkbox).toHaveClass('checked')

    $checkbox.trigger 'mouseover'
    expect($checkbox).toHaveClass('hover')

    $checkbox.trigger 'mousedown'
    expect($checkbox).toHaveClass('pressed')

  it 'should animate when click and animate optioned', ->
    newOpts = $.extend(opts, {animation: true})
    checkbox = simple.checkbox newOpts
    $checkbox = $('.simple-checkbox')

    $checkbox.trigger 'click'
    expect($checkbox.find('.checkbox-ripple')).toExist()
    expect($checkbox.find('.checkbox-ripple')).toHaveClass('transition')

    $checkbox.find('.checkbox-ripple').trigger simple.util.transitionEnd()
    expect($checkbox.find('.checkbox-ripple')).not.toExist()

  it 'should be destroyed when invoke destroy method', ->
    checkbox = simple.checkbox opts
    checkbox.destroy()
    expect($('.simple-checkbox').length).toBe(0)
    expect($('#checkbox').length).toBe(1)




