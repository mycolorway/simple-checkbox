(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('simple-checkbox', ["jquery",
      "simple-module",
      "simple-util"], function ($, SimpleModule, SimpleUtil) {
      return (root.returnExportsGlobal = factory($, SimpleModule, SimpleUtil));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),
      require("simple-module"),
      require("simple-util"));
  } else {
    root.simple = root.simple || {};
    root.simple['checkbox'] = factory(jQuery,
      SimpleModule,
      simple.util);
  }
}(this, function ($, SimpleModule, SimpleUtil) {

var Checkbox, checkbox,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Checkbox = (function(_super) {
  __extends(Checkbox, _super);

  function Checkbox() {
    return Checkbox.__super__.constructor.apply(this, arguments);
  }

  Checkbox.prototype.opts = {
    el: "",
    size: 18,
    animation: false
  };

  Checkbox.prototype._tpl = '<div class="simple-checkbox">\n  <div class="checkbox-container">\n    <div class="checkbox-tick">\n    </div>\n  </div>\n</div>';

  Checkbox.prototype._init = function() {
    var checkbox;
    this.checkbox = $(this.opts.el).first();
    if (this.checkbox.length === 0) {
      throw new Error("simple-checkbox: el option is invalid");
    }
    checkbox = this.checkbox.data("simple-checkbox");
    if (checkbox) {
      checkbox.destroy();
    }
    this.checked = this.checkbox.prop("checked");
    return this._render();
  };

  Checkbox.prototype._render = function() {
    this.checkbox.hide();
    this.el = this.checkbox.parent('.simple-checkbox');
    if (this.el.length < 1) {
      this.el = $(this._tpl).insertAfter(this.checkbox);
      this.el.append(this.checkbox);
      this.checkbox.addClass('checkbox-input');
      this.el.css({
        height: this.opts.size,
        width: this.opts.size
      });
      this.el.find('.checkbox-container').css({
        border: 0.10 * this.opts.size + 'px solid'
      });
      this.el.find('.checkbox-tick').css({
        'border-right': 0.14 * this.opts.size + 'px solid',
        'border-bottom': 0.14 * this.opts.size + 'px solid'
      });
    }
    if (this.checkbox.prop("disabled")) {
      this.disable();
    }
    this.check(this.checked);
    this.checkbox.data("simple-checkbox", this);
    this.el.data("simple-checkbox", this);
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
        $(document).one("mouseup", function(e) {
          return _this.el.removeClass("pressed");
        });
        return false;
      };
    })(this));
    return this.el.click((function(_this) {
      return function() {
        if (_this.el.hasClass("disabled")) {
          return;
        }
        if (_this.checked) {
          _this.check(false);
          _this.el.trigger("unchecked");
        } else {
          _this.check(true);
          _this.el.trigger("checked");
        }
        if (_this.opts.animation) {
          _this._startAnimation();
        }
        return false;
      };
    })(this));
  };

  Checkbox.prototype._startAnimation = function() {
    if (this.ripple) {
      return;
    }
    this.ripple = $('<div class="checkbox-ripple">').one(SimpleUtil.transitionEnd(), (function(_this) {
      return function(e) {
        _this.ripple.remove();
        return _this.ripple = null;
      };
    })(this)).prependTo(this.el);
    this.reflow();
    return this.ripple.addClass('transition');
  };

  Checkbox.prototype.reflow = function() {
    return this.el[0].offsetHeight;
  };

  Checkbox.prototype.check = function(checked) {
    if (checked == null) {
      return this.checked;
    }
    this.checked = checked;
    if (checked) {
      this.el.addClass("checked");
      return this.checkbox.prop("checked", true);
    } else {
      this.el.removeClass("checked");
      return this.checkbox.prop("checked", false);
    }
  };

  Checkbox.prototype.destroy = function() {
    this.checkbox.insertAfter(this.el).show();
    this.checkbox.removeData("simple-checkbox");
    return this.el.remove();
  };

  Checkbox.prototype.disable = function() {
    this.checkbox.prop("disabled", true);
    return this.el.addClass("disabled");
  };

  Checkbox.prototype.enable = function() {
    this.checkbox.prop("disabled", false);
    return this.el.removeClass("disabled");
  };

  return Checkbox;

})(SimpleModule);

checkbox = function(opts) {
  return new Checkbox(opts);
};


return checkbox;


}));

