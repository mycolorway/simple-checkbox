(function() {
  var Checkbox,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Checkbox = (function(_super) {
    __extends(Checkbox, _super);

    function Checkbox() {
      return Checkbox.__super__.constructor.apply(this, arguments);
    }

    Checkbox.prototype.opts = {
      el: ""
    };

    Checkbox.prototype._init = function() {
      this.checkbox = $(this.opts.el).first();
      if (this.checkbox.length === 0) {
        throw new Error("Error!Please provide a valid selector");
      }
      this.checked = this.checkbox.prop("checked");
      return this._render();
    };

    Checkbox.prototype._render = function() {
      this.checkbox.hide();
      this.el = $('<div class="simple-checkbox"></div>').insertAfter(this.checkbox);
      this.el.append(this.checkbox);
      this.check(this.checked);
      return this._bind();
    };

    Checkbox.prototype._bind = function() {
      this.el.hover((function(_this) {
        return function() {
          return _this.el.addClass("hover");
        };
      })(this), (function(_this) {
        return function() {
          return _this.el.removeClass("hover");
        };
      })(this));
      this.el.mousedown((function(_this) {
        return function() {
          _this.el.addClass("pressed");
          return false;
        };
      })(this));
      return this.el.click((function(_this) {
        return function() {
          _this.el.removeClass("pressed");
          if (_this.checked) {
            _this.check(false);
          } else {
            _this.check(true);
          }
          return false;
        };
      })(this));
    };

    Checkbox.prototype.check = function(checked) {
      if (checked == null) {
        return this.checked;
      }
      this.checked = checked;
      if (checked) {
        this.el.addClass("checked");
        this.el.trigger("checked");
        return this.checkbox.prop("checked", true);
      } else {
        this.el.removeClass("checked");
        this.el.trigger("unchecked");
        return this.checkbox.prop("checked", false);
      }
    };

    Checkbox.prototype.destroy = function() {
      this.checkbox.show();
      return this.el.remove();
    };

    return Checkbox;

  })(Widget);

  window.simple || (window.simple = {});

  simple.checkbox = function(opts) {
    return new Checkbox(opts);
  };

}).call(this);
