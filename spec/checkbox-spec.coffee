describe "checkbox", ->

  html='<div class="content">
          <form>
            <input type="checkbox" id="checkbox" />
          </form>
        </div>'
  $(html).appendTo "body"

  opts=
    el:"#checkbox"



  beforeEach ->
    $('.content').remove()
    $(html).appendTo "body"
    $('#checkbox').css("display","inline-block")

  it "should let input be in div.simple-checkbox when init", ->
    simple.checkbox opts
    expect($("div.simple-checkbox").length).toBe(1)
    expect($('#checkbox').parent().hasClass('simple-checkbox')).toBe(true)
    expect($('#checkbox').css('display')).toBe("none")


  it "should throw an exception when opts is not provided", ->
    testException = ->
      simple.checkbox()
    expect(testException).toThrow()

  it "should change class, when different function invoke", ->
    checkbox = simple.checkbox opts
    checkbox.check true
    expect($('#checkbox').parent().hasClass('checked')).toBe(true)

    checkbox.check false
    expect($('#checkbox').parent().hasClass('checked')).toBe(false)

    checkbox.disable()
    expect($('#checkbox').parent().hasClass('disabled')).toBe(true)

    checkbox.enable()
    expect($('#checkbox').parent().hasClass('disabled')).toBe(false)

  it "should change class, then different event triggered", ->
    checkbox = simple.checkbox opts

    $('.simple-checkbox').trigger "click"
    expect($('#checkbox').parent().hasClass('checked')).toBe(true)

    $('.simple-checkbox').trigger "mouseover"
    expect($('#checkbox').parent().hasClass('hover')).toBe(true)

    $('.simple-checkbox').trigger "mousedown"
    expect($('#checkbox').parent().hasClass('pressed')).toBe(true)

  it "should be destroyed when invoke destroy method", ->
    checkbox = simple.checkbox opts
    checkbox.destroy()
    expect($('.simple-checkbox').length).toBe(0)
    expect($('#checkbox').length).toBe(1)






