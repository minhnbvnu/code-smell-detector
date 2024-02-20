function atom(ll, cl, lr, cr, li, ri) {
    return cm.markText(Pos(ll, cl), Pos(lr, cr),
                       {atomic: true, inclusiveLeft: li, inclusiveRight: ri});
  }