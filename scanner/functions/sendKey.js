function sendKey(code) {
    cm.triggerOnKeyDown({type: "keydown", keyCode: code,
                         preventDefault: function(){}, stopPropagation: function(){}});
  }