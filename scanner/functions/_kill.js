function _kill(cm, from, to, ring, text) {
    if (text == null) text = cm.getRange(from, to);

    if (ring == 'grow' && lastKill && lastKill.cm == cm && posEq(from, lastKill.pos) && cm.isClean(lastKill.gen))
      growRingTop(text);
    else if (ring !== false) addToRing(text);
    cm.replaceRange('', from, to, '+delete');

    if (ring == 'grow') lastKill = { cm: cm, pos: from, gen: cm.changeGeneration() };
    else lastKill = null;
  }