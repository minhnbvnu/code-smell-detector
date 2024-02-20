function makeEmojiElement (emoji) {
    var ele
    if(that.usetwemoji) {
      if (emoji.src) {
        ele = emoji
      } else {
        ele = document.createElement('img')
        ele.className = 'emoji'
        ele.setAttribute('aria-hidden', 'true')
        ele.src = twemoji.parse(emoji).match(/src=\"(.+)\">/)[1]
      }
    } else {
      ele = document.createTextNode(emoji.alt || emoji.data || emoji)
    }
    return ele
  }