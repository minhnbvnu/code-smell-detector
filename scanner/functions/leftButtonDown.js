function leftButtonDown(cm, e, start) {
  if (ie) { setTimeout(bind(ensureFocus, cm), 0); }
  else { cm.curOp.focus = activeElt(); }

  var now = +new Date, type;
  if (lastDoubleClick && lastDoubleClick.time > now - 400 && cmp(lastDoubleClick.pos, start) == 0) {
    type = "triple";
  } else if (lastClick && lastClick.time > now - 400 && cmp(lastClick.pos, start) == 0) {
    type = "double";
    lastDoubleClick = {time: now, pos: start};
  } else {
    type = "single";
    lastClick = {time: now, pos: start};
  }

  var sel = cm.doc.sel, modifier = mac ? e.metaKey : e.ctrlKey, contained;
  if (cm.options.dragDrop && dragAndDrop && !cm.isReadOnly() &&
      type == "single" && (contained = sel.contains(start)) > -1 &&
      (cmp((contained = sel.ranges[contained]).from(), start) < 0 || start.xRel > 0) &&
      (cmp(contained.to(), start) > 0 || start.xRel < 0))
    { leftButtonStartDrag(cm, e, start, modifier); }
  else
    { leftButtonSelect(cm, e, start, type, modifier); }
}