function isBlocked(el,type){
  return blockedEvents.some(function(cur){
    return cur.type==type && cur.el==el;
  });
}