function UJ(e,t){t.classHierarchy.push("vtkImageCroppingWidget");var n=null;function r(e,n){t.widgetState.getStatesWithLabel(e).forEach((function(e){e.setVisible(n)}))}e.setFaceHandlesEnabled=function(e){return r("faces",e)},e.setEdgeHandlesEnabled=function(e){return r("edges",e)},e.setCornerHandlesEnabled=function(e){return r("corners",e)},e.copyImageDataDescription=function(n){var r,i;(r=t.widgetState).setIndexToWorldT.apply(r,y(n.getIndexToWorld())),(i=t.widgetState).setWorldToIndexT.apply(i,y(n.getWorldToIndex()));var o=n.getDimensions();t.widgetState.getCroppingPlanes().setPlanes([0,o[0],0,o[1],0,o[2]]),e.modified()},e.updateHandles=function(){for(var e=t.widgetState.getCroppingPlanes().getPlanes(),n=[(e[0]+e[1])/2,(e[2]+e[3])/2,(e[4]+e[5])/2],r=[e[0],n[0],e[1]],i=[e[2],n[1],e[3]],o=[e[4],n[2],e[5]],a=t.widgetState.getIndexToWorldT(),s=function(e){return EJ[e]},l=0;l<3;l++)for(var u=0;u<3;u++)for(var c=0;c<3;c++)if(1!==l||1!==u||1!==c){var d=[l,u,c].map(s).join(""),p=IJ([r[l],i[u],o[c]],a),f=g(t.widgetState.getStatesWithLabel(d),1)[0];f.setOrigin.apply(f,y(p))}},e.delete=Se.chain(e.delete,(function(){n&&n.unsubscribe()})),t.behavior=NJ,t.widgetState=RJ.build(),e.getRepresentationsForViewType=function(e){switch(e){case rP.DEFAULT:case rP.GEOMETRY:case rP.SLICE:case rP.VOLUME:}return[{builder:NZ,labels:["handles"]},{builder:DJ,labels:["corners"]}]},n=t.widgetState.getCroppingPlanes().onModified(e.updateHandles);var i=BY.newInstance(),o=kY.newInstance();t.widgetState.getStatesWithLabel("corners").forEach((function(e){return e.setManipulator(i)})),t.widgetState.getStatesWithLabel("edges").forEach((function(e){return e.setManipulator(i)})),t.widgetState.getStatesWithLabel("faces").forEach((function(e){return e.setManipulator(o)}))}