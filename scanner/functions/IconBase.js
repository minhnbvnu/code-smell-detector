function IconBase(i){var elem=function(o){var u,C=i.size||o.size||"1em";o.className&&(u=o.className),i.className&&(u=(u?u+" ":"")+i.className);var _=i.attr,w=i.title,P=__rest(i,["attr","title"]);return s.createElement("svg",__assign({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},o.attr,_,P,{className:u,style:__assign({color:i.color||o.color},o.style,i.style),height:C,width:C,xmlns:"http://www.w3.org/2000/svg"}),w&&s.createElement("title",null,w),i.children)};return void 0!==ht?s.createElement(ht.Consumer,null,(function(i){return elem(i)})):elem(Rt)}