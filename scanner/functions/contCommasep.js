function contCommasep(what, end, info) {
    var arguments$1 = arguments;

    for (var i = 3; i < arguments.length; i++)
      { cx.cc.push(arguments$1[i]); }
    return cont(pushlex(end, info), commasep(what, end), poplex);
  }