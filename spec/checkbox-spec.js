(function() {
  describe("checkbox", function() {
    var html, opts;
    html = '<div class="content"> <form> <input type="checkbox" id="checkbox" /> </form> </div>';
    $(html).appendTo("body");
    opts = {
      el: "#checkbox"
    };
    beforeEach(function() {
      $('.content').remove();
      $(html).appendTo("body");
      return $('#checkbox').css("display", "inline-block");
    });
    it("should let input be in div.simple-checkbox when init", function() {
      simple.checkbox(opts);
      expect($("div.simple-checkbox").length).toBe(1);
      expect($('#checkbox').parent().hasClass('simple-checkbox')).toBe(true);
      return expect($('#checkbox').css('display')).toBe("none");
    });
    it("should throw an exception when opts is not provided", function() {
      var testException;
      testException = function() {
        return simple.checkbox();
      };
      return expect(testException).toThrow();
    });
    it("should change class, when different function invoke", function() {
      var checkbox;
      checkbox = simple.checkbox(opts);
      checkbox.check(true);
      expect($('#checkbox').parent().hasClass('checked')).toBe(true);
      checkbox.check(false);
      expect($('#checkbox').parent().hasClass('checked')).toBe(false);
      checkbox.disable();
      expect($('#checkbox').parent().hasClass('disabled')).toBe(true);
      checkbox.enable();
      return expect($('#checkbox').parent().hasClass('disabled')).toBe(false);
    });
    it("should change class, then different event triggered", function() {
      var checkbox;
      checkbox = simple.checkbox(opts);
      $('.simple-checkbox').trigger("click");
      expect($('#checkbox').parent().hasClass('checked')).toBe(true);
      $('.simple-checkbox').trigger("mouseover");
      expect($('#checkbox').parent().hasClass('hover')).toBe(true);
      $('.simple-checkbox').trigger("mousedown");
      return expect($('#checkbox').parent().hasClass('pressed')).toBe(true);
    });
    return it("should be destroyed when invoke destroy method", function() {
      var checkbox;
      checkbox = simple.checkbox(opts);
      checkbox.destroy();
      expect($('.simple-checkbox').length).toBe(0);
      return expect($('#checkbox').length).toBe(1);
    });
  });

}).call(this);
