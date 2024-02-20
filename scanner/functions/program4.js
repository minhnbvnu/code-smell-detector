function program4(depth0,data) {
  
  var hashContexts, hashTypes;
  hashContexts = {'contentBinding': depth0,'labelBinding': depth0};
  hashTypes = {'contentBinding': "ID",'labelBinding': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "view.groupView", {hash:{
    'contentBinding': ("content"),
    'labelBinding': ("label")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  }