function wJ(e,t){t.classHierarchy.push("vtkEllipseWidget"),t.methodsToLink=[].concat(y(t.methodsToLink),["activeScaleFactor","activeColor","useActiveColor","glyphResolution","defaultScale","drawBorder","drawFace","opacity"]),t.behavior=yJ,e.getRepresentationsForViewType=function(e){switch(e){case rP.DEFAULT:case rP.GEOMETRY:case rP.SLICE:case rP.VOLUME:}return[{builder:NZ,labels:["moveHandle"],initialValues:{scaleInPixels:!0}},{builder:QY,labels:["ellipseHandle"]},{builder:pJ,initialValues:{showCircle:!1,text:""},labels:["SVGtext"]}]},t.manipulator=BY.newInstance(),t.widgetState=_Y.createBuilder().addStateFromMixin({labels:["moveHandle"],mixins:["origin","color","scale1","visible","manipulator"],name:"point1Handle",initialValues:{scale1:10,origin:[void 0,void 0,void 0],visible:!1}}).addStateFromMixin({labels:["moveHandle"],mixins:["origin","color","scale1","visible","manipulator"],name:"point2Handle",initialValues:{scale1:10,origin:[void 0,void 0,void 0],visible:!1}}).addStateFromMixin({labels:["ellipseHandle"],mixins:["origin","color","scale3","visible","orientation"],name:"ellipseHandle",initialValues:{visible:!1,scale3:[1,1,1]}}).addStateFromMixin({labels:["SVGtext"],mixins:["origin","color","text","visible"],name:"text",initialValues:{text:"",visible:!1,origin:[0,0,0]}}).addField({name:"textPosition",initialValue:[QZ,QZ,QZ]}).addField({name:"textWorldMargin",initialValue:0}).build()}