function program6(depth0,data) {
  
  var stack1, hashTypes, hashContexts;
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "view.content", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }