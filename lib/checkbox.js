(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('simple-checkbox', ["jquery",
      "simple-module"], function ($, SimpleModule) {
      return (root.returnExportsGlobal = factory($, SimpleModule));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),
      require("simple-module"));
  } else {
    root.simple = root.simple || {};
    root.simple['checkbox'] = factory(jQuery,
      SimpleModule);
  }
}(this, function ($, SimpleModule) {

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
    size: null,
    animation: false
  };

  Checkbox.prototype._tpl = '<div class="simple-checkbox">\n  <div class="checkbox-container">\n    <div class="checkbox-tick"></div>\n    <div class="checkbox-ripple"></div>\n  </div>\n</div>';

  Checkbox.prototype._init = function() {
    this.checkbox = $(this.opts.el).first();
    if (this.checkbox.length === 0) {
      throw new Error("Error!Please provide a valid selector");
    }
    if (this.checkbox.data("simple-checkbox")) {
      return;
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
      if (this.opts.size) {
        this.el.css('height', this.opts.size + 'px').css('width', this.opts.size + 'px').css('font-size', this.opts.size + 'px');
      }
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
        if (_this.opts.animation) {
          _this._animate();
        }
        if (_this.checked) {
          _this.check(false);
          _this.el.trigger("unchecked");
        } else {
          _this.check(true);
          _this.el.trigger("checked");
        }
        return false;
      };
    })(this));
  };

  Checkbox.prototype._animate = function() {
    if (this.el.hasClass('show')) {
      setTimeout((function(_this) {
        return function() {
          return _this.el.removeClass('show animate');
        };
      })(this), 0);
    }
    this.el.addClass('show');
    setTimeout((function(_this) {
      return function() {
        return _this.el.addClass('animate');
      };
    })(this));
    0;
    return this.el.on('animationend', (function(_this) {
      return function() {
        return _this.el.removeClass('show animate');
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

