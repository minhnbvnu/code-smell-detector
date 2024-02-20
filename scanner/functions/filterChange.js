function filterChange(doc, change, update) {
  var obj = {
    canceled: false,
    from: change.from,
    to: change.to,
    text: change.text,
    origin: change.origin,
    cancel: function () { return obj.canceled = true; }
  };
  if (update) { obj.update = function (from, to, text, origin) {
    if (from) { obj.from = clipPos(doc, from); }
    if (to) { obj.to = clipPos(doc, to); }
    if (text) { obj.text = text; }
    if (origin !== undefined) { obj.origin = origin; }
  }; }
  signal(doc, "beforeChange", doc, obj);
  if (doc.cm) { signal(doc.cm, "beforeChange", doc.cm, obj); }

  if (obj.canceled) { return null }
  return {from: obj.from, to: obj.to, text: obj.text, origin: obj.origin}
}