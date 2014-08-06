(function() {
  var Checkbox,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Checkbox = (function(_super) {
    __extends(Checkbox, _super);

    function Checkbox() {
      return Checkbox.__super__.constructor.apply(this, arguments);
    }

    Checkbox.status = {
      "normal": 1,
      "hover": 2,
      "active": 3,
      "checked": 4,
      "checked-hover": 5,
      "checked-active": 6,
      "disabled": 7
    };

    Checkbox.prototype.opts = {
      spriteUrl: "image/checkbox.png",
      size: 16,
      gap: 4
    };

    Checkbox.prototype._init = function() {
      this.checked = false;
      this.$origin = $(this.opts.el);
      return this.render();
    };

    Checkbox.prototype.render = function() {
      this.$origin.css('display', 'none');
      this.$checkbox = $('<div class="simple-checkbox"></div>').insertAfter(this.$origin);
      this.$checkbox.css("background-image", "url(" + this.opts.spriteUrl + ")");
      this.$checkbox.width(this.opts.size).height(this.opts.size);
      return this.handleEvent();
    };

    Checkbox.prototype.handleEvent = function() {
      this.$checkbox.hover((function(_this) {
        return function() {
          if (_this.checked) {
            return _this.changeImage("checked-hover");
          } else {
            return _this.changeImage("hover");
          }
        };
      })(this), (function(_this) {
        return function() {
          if (_this.checked) {
            return _this.changeImage("checked");
          } else {
            return _this.changeImage("normal");
          }
        };
      })(this));
      this.$checkbox.mousedown((function(_this) {
        return function() {
          if (_this.checked) {
            return _this.changeImage("checked-active");
          } else {
            return _this.changeImage("active");
          }
        };
      })(this));
      return this.$checkbox.mouseup((function(_this) {
        return function() {
          if (_this.checked) {
            return _this.check(false);
          } else {
            return _this.check(true);
          }
        };
      })(this));
    };

    Checkbox.prototype.changeImage = function(s) {
      var number, y;
      number = Checkbox.status[s];
      y = (this.opts.size + this.opts.gap) * (number - 1);
      return this.$checkbox.css("backgroundPosition", "0px " + (-y) + "px");
    };

    Checkbox.prototype.check = function(checked) {
      if (checked == null) {
        return this.checked;
      }
      this.checked = checked;
      if (checked) {
        this.changeImage("checked");
        return this.$checkbox.trigger("checked");
      } else {
        this.changeImage("normal");
        return this.$checkbox.trigger("unchecked");
      }
    };

    Checkbox.prototype.destroy = function() {
      this.$origin.css("display", "inline-block");
      return this.$checkbox.remove();
    };

    return Checkbox;

  })(Widget);

  window.simple || (window.simple = {});

  simple.checkbox = function(opts) {
    if (!((opts != null) && (opts.el != null))) {
      return;
    }
    return new Checkbox(opts);
  };

}).call(this);
