(($)->
  $.fn.animeText = (opt)->
    def =
      'speed': '1s',
      'vital': 1
    if opt == 'destroy'
      this.trigger('destroy.anime-text')
      return this
    opt = $.extend(opt, def)
    return this.each(->
      elem = $(this)
      if elem.data('anime-text') then return
      elem.data( 'anime-text', (data = new AnimationText(elem, opt)) )
    )

  class AnimationText
    constructor:(@target, @opt)->
      self = @
      @target.on('destroy.anime-text', ->
        destroy.apply(self, [$(this)])
      )
      @text = wrapping(@target, @target.text())
      animation.apply(@, [@text])

    vender = [
      '-webkit-', '-moz-', '-o-', '-ms-',  '-khtml-', ''
    ]

    destroy = (elem)->
      elem.data('anime-text', false)
      elem.html( elem.text() )
      @style.remove()
      elem.off('destroy.anime-text')

    wrapping = (target, text)->
      target.empty()
      ary = []
      for char in text
        if char == ' ' then char = "&nbsp;"
        a = $('<span/>').html(char)
        ary.push( a )
        target.append( a )
      return ary

    animation = (ary)->
      setAnimationName.apply(@, [ary])

    setAnimationName = (ary)->
      keyframes = ''
      for item in ary
        frameName = 'animeText-' + randomString(32)
        style = {}
        for v in vender
          style[ v + 'animation-name' ] = frameName
          style[ v + 'animation-iteration-count' ] = 'infinite'
          style[ v + 'animation-duration' ] = @opt.speed
          style[ v + 'animation-fill-mode' ] = 'both'
          style[ v + 'animation-timing-function'] = 'ease'
          keyframes += '@' + v + 'keyframes ' + frameName + '{'
          keyframes += getFrameProp.apply(@)
          keyframes += '}'
        style['display'] = 'inline-block'
        item.css(style)
      @style = $('<style/>').html(keyframes).appendTo('head')


    getFrameProp = ->
      from = {}
      to = {}
      css = ''
      for i in [0...10]
        transform = getTransform.apply(@)
        vcss = {}
        for v in vender
          key = v + 'transform'
          vcss[key] = transform
        css += cssParse(i*10+'%', vcss)
      return css

    getTransform = ->
      vital = @opt.vital
      rotate = s1(2*vital - Math.random() * 4*vital)
      scale =
          'x': s1( 0.975 + Math.random() * 0.05 ),
          'y': s1( 0.975 + Math.random() * 0.05 )
      skew = s1(2*vital - Math.random() * 4*vital )
      return 'rotate(' + rotate + 'deg) scale(' + scale.x + ',' + scale.y + ') skew(' + skew + 'deg)'

    s1 = (num)->
      return Math.floor(num * 100) / 100

    cssParse = (name, obj)->
      ary = []
      for k, v of obj
        ary.push( k + ':' + v )
      return name + '{' + ary.join(';') + '}'

    randomString = (n)->
    	a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    	s = '';
    	for [0..n]
        s += a[Math.floor(Math.random() * a.length)]
    	return s
)(jQuery)