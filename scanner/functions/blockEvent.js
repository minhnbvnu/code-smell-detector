function blockEvent(el,type,dur){
  if(typeof dur!="number") dur=1000

  blockedEvents.push({
    el:el,
    type:type
  });
  setTimeout(function(){
    blockedEvents.shift();
  },dur);
}