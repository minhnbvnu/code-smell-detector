function registerEvent(type,el,callback,listener){
  el.addEventListener(type,listener);

  listeners.push({
    type:type,
    el:el,
    callback:callback,
    listener:listener
  });
}