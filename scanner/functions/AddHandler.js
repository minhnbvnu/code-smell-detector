function AddHandler(h,f,e) {
  e = e || doc;
  if(e.addEventListener)
    e.addEventListener(h,f,false);
  else
    e.attachEvent('on' + h, f);
}