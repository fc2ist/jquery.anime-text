
(function($) {
  var AnimationText;
  $.fn.animeText = function(opt) {
    var def;
    def = {
      'speed': '1s',
      'vital': 1
    };
    if (opt === 'destroy') {
      this.trigger('destroy.anime-text');
      return this;
    }
    opt = $.extend(def, opt);
    return this.each(function() {
      var data, elem;
      elem = $(this);
      if (elem.data('anime-text')) {
        return;
      }
      return elem.data('anime-text', (data = new AnimationText(elem, opt)));
    });
  };
  return AnimationText = (function() {
    var animation, cssParse, destroy, getFrameProp, getTransform, randomString, s1, setAnimationName, vender, wrapping;

    function AnimationText(target, opt) {
      var self;
      this.target = target;
      this.opt = opt;
      self = this;
      this.target.on('destroy.anime-text', function() {
        return destroy.apply(self, [$(this)]);
      });
      this.text = wrapping(this.target, this.target.text());
      animation.apply(this, [this.text]);
    }

    vender = ['-webkit-', '-moz-', '-o-', '-ms-', '-khtml-', ''];

    destroy = function(elem) {
      elem.data('anime-text', false);
      elem.html(elem.text());
      this.style.remove();
      return elem.off('destroy.anime-text');
    };

    wrapping = function(target, text) {
      var a, ary, char, _i, _len;
      target.empty();
      ary = [];
      for (_i = 0, _len = text.length; _i < _len; _i++) {
        char = text[_i];
        if (char === ' ') {
          char = "&nbsp;";
        }
        a = $('<span/>').html(char);
        ary.push(a);
        target.append(a);
      }
      return ary;
    };

    animation = function(ary) {
      return setAnimationName.apply(this, [ary]);
    };

    setAnimationName = function(ary) {
      var frameName, item, keyframes, style, v, _i, _j, _len, _len1;
      keyframes = '';
      for (_i = 0, _len = ary.length; _i < _len; _i++) {
        item = ary[_i];
        frameName = 'animeText-' + randomString(32);
        style = {};
        for (_j = 0, _len1 = vender.length; _j < _len1; _j++) {
          v = vender[_j];
          style[v + 'animation-name'] = frameName;
          style[v + 'animation-iteration-count'] = 'infinite';
          style[v + 'animation-duration'] = this.opt.speed;
          style[v + 'animation-fill-mode'] = 'both';
          style[v + 'animation-timing-function'] = 'ease';
          keyframes += '@' + v + 'keyframes ' + frameName + '{';
          keyframes += getFrameProp.apply(this);
          keyframes += '}';
        }
        style['display'] = 'inline-block';
        item.css(style);
      }
      return this.style = $('<style/>').html(keyframes).appendTo('head');
    };

    getFrameProp = function() {
      var css, from, i, key, to, transform, v, vcss, _i, _j, _len;
      from = {};
      to = {};
      css = '';
      for (i = _i = 0; _i < 10; i = ++_i) {
        transform = getTransform.apply(this);
        vcss = {};
        for (_j = 0, _len = vender.length; _j < _len; _j++) {
          v = vender[_j];
          key = v + 'transform';
          vcss[key] = transform;
        }
        css += cssParse(i * 10 + '%', vcss);
      }
      return css;
    };

    getTransform = function() {
      var rotate, scale, skew, vital;
      vital = this.opt.vital;
      rotate = s1(2 * vital - Math.random() * 4 * vital);
      scale = {
        'x': s1(0.975 + Math.random() * 0.05),
        'y': s1(0.975 + Math.random() * 0.05)
      };
      skew = s1(2 * vital - Math.random() * 4 * vital);
      return 'rotate(' + rotate + 'deg) scale(' + scale.x + ',' + scale.y + ') skew(' + skew + 'deg)';
    };

    s1 = function(num) {
      return Math.floor(num * 100) / 100;
    };

    cssParse = function(name, obj) {
      var ary, k, v;
      ary = [];
      for (k in obj) {
        v = obj[k];
        ary.push(k + ':' + v);
      }
      return name + '{' + ary.join(';') + '}';
    };

    randomString = function(n) {
      var a, s, _i;
      a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      s = '';
      for (_i = 0; 0 <= n ? _i <= n : _i >= n; 0 <= n ? _i++ : _i--) {
        s += a[Math.floor(Math.random() * a.length)];
      }
      return s;
    };

    return AnimationText;

  })();
})(jQuery);
