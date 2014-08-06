describe "checkbox", ->

  html='<div class="content">
          <form>
            <input type="checkbox" id="cb" />
          </form>
        </div>'
  $(html).appendTo "body"

  opts=
    el:"#cb"
    spriteUrl:"../image/checkbox.png"



  beforeEach ->
    $('form div').remove()
    $('#cb').css("display","inline-block")

  it "should see checkbox div and hide origin element if everything is ok", ->
    checkbox = simple.checkbox opts
    expect($('#cb').next("div.simple-checkbox").length).toBe(1)
    expect($('#cb').css('display')).toBe("none")


  it "should do nothing if without opts.el", ->
    simple.checkbox()
    expect($('.simple-checkbox').length).toBe(0)



  it "shoudl change background image position when in different states", ->
    checkbox=simple.checkbox opts
    checkbox.check false #chagne position from "0% 0%" to "0px 0px"

    normal=$('.simple-checkbox').css('backgroundPosition')

    $('.simple-checkbox').trigger "mouseenter"
    hover=$('.simple-checkbox').css('backgroundPosition')
    expect(hover).not.toBe(normal)


    $('.simple-checkbox').trigger "mouseleave"
    normal2=$('.simple-checkbox').css('backgroundPosition')
    expect(normal2).toBe(normal)

    $('.simple-checkbox').trigger "mousedown"
    clicked=$('.simple-checkbox').css('backgroundPosition')
    expect(clicked).not.toBe(normal)

    $('.simple-checkbox').trigger "mouseup"
    checked=$('.simple-checkbox').css('backgroundPosition')
    expect(checked).not.toBe(normal)


  it "should manipulate check state by calling check", ->
    checkbox=simple.checkbox opts
    expect(checkbox.check()).toBe(false)

    checkbox.check true
    expect(checkbox.check()).toBe(true)

    checkbox.check false
    expect(checkbox.check()).toBe(false)


  it "shoudl trigger checked and unchecked event when checked and unchecked", ->
    a=1
    checkbox=simple.checkbox opts
    $('.simple-checkbox').on "checked",->
      a=10
    checkbox.check true
    expect(a).toBe(10)

    $('.simple-checkbox').on "unchecked",->
      a=1
    checkbox.check false
    expect(a).toBe(1)

  it "should remove simple checkbox and show origin checkbox after calling destroy", ->
    checkbox=simple.checkbox opts
    checkbox.destroy()
    expect($('.simple-checkbox').length).toBe(0)
    expect($('#cb').css("display")).toBe("inline-block")










