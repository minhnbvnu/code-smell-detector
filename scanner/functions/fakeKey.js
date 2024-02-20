function fakeKey(expected, code, props) {
    if (typeof code == "string") code = code.charCodeAt(0);
    var e = {type: "keydown", keyCode: code, preventDefault: function(){}, stopPropagation: function(){}};
    if (props) for (var n in props) e[n] = props[n];
    outcome = null;
    cm.triggerOnKeyDown(e);
    eq(outcome, expected);
  }