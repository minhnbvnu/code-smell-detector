function enterPress() {
    cm.triggerOnKeyDown({type: "keydown", keyCode: 13, preventDefault: function(){}, stopPropagation: function(){}});
  }