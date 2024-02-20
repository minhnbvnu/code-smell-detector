function unregisterEvent(type,el,callback){
  listeners.filter(function(listener){
    return (listener.type==type && listener.el==el && listener.callback==callback);
  }).forEach(function(listener){
    console.log(listener);
    listener.el.removeEventListener(listener.type,listener.listener);
  });

  listeners=listeners.filter(function(listener){
    return !(listener.type==type && listener.el==el && listener.callback==callback);
  })
}