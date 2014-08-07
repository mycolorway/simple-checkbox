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
      this.checked = false;
      this.checkbox = $(this.opts.el).first();
      if (this.checkbox.length === 0) {
        throw new Error("必须提供一个有效的选择符");
      }
      return this.render();
    };

    Checkbox.prototype.render = function() {
      this.checkbox.css('display', 'none');
      this.el = $('<div class="simple-checkbox"></div>').insertAfter(this.checkbox);
      this.el.append(this.checkbox);
      return this._bind();
    };

    Checkbox.prototype._bind = function() {
      this.el.hover((function(_this) {
        return function() {
          if (_this.checked) {
            return _this.changeStatus("checked-hover");
          } else {
            return _this.changeStatus("hover");
          }
        };
      })(this), (function(_this) {
        return function() {
          if (_this.checked) {
            return _this.changeStatus("checked");
          } else {
            return _this.changeStatus("normal");
          }
        };
      })(this));
      this.el.mousedown((function(_this) {
        return function() {
          if (_this.checked) {
            return _this.changeStatus("checked-active");
          } else {
            return _this.changeStatus("active");
          }
        };
      })(this));
      return this.el.mouseup((function(_this) {
        return function() {
          if (_this.checked) {
            return _this.check(false);
          } else {
            return _this.check(true);
          }
        };
      })(this));
    };

    Checkbox.prototype.changeStatus = function(status) {
      this.el.removeClass();
      this.el.addClass("simple-checkbox");
      return this.el.addClass(status);
    };

    Checkbox.prototype.check = function(checked) {
      if (checked == null) {
        return this.checked;
      }
      this.checked = checked;
      if (checked) {
        this.changeStatus("checked");
        this.el.trigger("checked");
        return this.checkbox.attr("checked", "checked");
      } else {
        this.changeStatus("normal");
        this.el.trigger("unchecked");
        return this.checkbox.removeAttr("checked");
      }
    };

    Checkbox.prototype.destroy = function() {
      this.checkbox.css("display", "inline-block");
      return this.el.remove();
    };

    return Checkbox;

  })(Widget);

  window.simple || (window.simple = {});

  simple.checkbox = function(opts) {
    return new Checkbox(opts);
  };

}).call(this);
