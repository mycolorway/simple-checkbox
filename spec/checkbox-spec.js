(function() {
  describe('checkbox', function() {
    var opts;
    opts = {
      el: '#checkbox'
    };
    beforeEach(function() {
      return $('<input id="checkbox" type="checkbox">').appendTo('body');
    });
    afterEach(function() {
      var checkbox;
      checkbox = $('#checkbox').data('simple-checkbox');
      if (checkbox != null) {
        checkbox.destroy();
      }
      return $('#checkbox').remove();
    });
    it('should render specific DOM when init', function() {
      simple.checkbox(opts);
      expect($('div.simple-checkbox')).toExist();
      expect($('.simple-checkbox>.checkbox-container>.checkbox-tick')).toExist();
      expect($('.simple-checkbox #checkbox')).toExist();
      return expect($('#checkbox').css('display')).toBe('none');
    });
    it('should change size when size opt provide', function() {
      var newOpts;
      newOpts = $.extend(opts, {
        size: 25
      });
      simple.checkbox(newOpts);
      expect($('.simple-checkbox').height()).toBe(25);
      return expect($('.simple-checkbox').width()).toBe(25);
    });
    it('should throw an exception when opts is not provided', function() {
      var testException;
      testException = function() {
        return simple.checkbox();
      };
      return expect(testException).toThrow();
    });
    it('should change class, when different function invoke', function() {
      var $checkbox, checkbox;
      checkbox = simple.checkbox(opts);
      checkbox.check(true);
      $checkbox = $('.simple-checkbox');
      expect($checkbox).toHaveClass('checked');
      checkbox.check(false);
      expect($checkbox).not.toHaveClass('checked');
      checkbox.disable();
      expect($checkbox).toHaveClass('disabled');
      checkbox.enable();
      return expect($checkbox).not.toHaveClass('disabled');
    });
    it('should change class, then different event triggered', function() {
      var $checkbox, checkbox;
      checkbox = simple.checkbox(opts);
      $checkbox = $('.simple-checkbox');
      $checkbox.trigger('click');
      expect($checkbox).toHaveClass('checked');
      $checkbox.trigger('mouseover');
      expect($checkbox).toHaveClass('hover');
      $checkbox.trigger('mousedown');
      return expect($checkbox).toHaveClass('pressed');
    });
    it('should animate when click and animate optioned', function() {
      var $checkbox, checkbox, newOpts;
      newOpts = $.extend(opts, {
        animation: true
      });
      checkbox = simple.checkbox(newOpts);
      $checkbox = $('.simple-checkbox');
      $checkbox.trigger('click');
      expect($checkbox.find('.checkbox-ripple')).toExist();
      expect($checkbox.find('.checkbox-ripple')).toHaveClass('transition');
      $checkbox.find('.checkbox-ripple').trigger(simple.util.transitionEnd());
      return expect($checkbox.find('.checkbox-ripple')).not.toExist();
    });
    return it('should be destroyed when invoke destroy method', function() {
      var checkbox;
      checkbox = simple.checkbox(opts);
      checkbox.destroy();
      expect($('.simple-checkbox').length).toBe(0);
      return expect($('#checkbox').length).toBe(1);
    });
  });

}).call(this);
