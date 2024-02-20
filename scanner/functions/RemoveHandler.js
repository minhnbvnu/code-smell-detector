function RemoveHandler(h,f,e) {
  e = e || doc;
  if(e.removeEventListener)
    e.removeEventListener(h, f);
  else
    e.detachEvent('on' + h, f);
}