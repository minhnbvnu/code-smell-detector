function yJ(e,t){t.shapeHandle=t.widgetState.getEllipseHandle(),t.point1Handle=t.widgetState.getPoint1Handle(),t.point2Handle=t.widgetState.getPoint2Handle(),t.point1Handle.setManipulator(t.manipulator),t.point2Handle.setManipulator(t.manipulator),gJ(e,t);var n=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?vJ(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):vJ(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e);t.classHierarchy.push("vtkEllipseWidgetProp"),e.setCorners=function(e,r){n.setCorners&&n.setCorners(e,r);var i=[.5*(e[0]+r[0]),.5*(e[1]+r[1]),.5*(e[2]+r[2])],o=[0,0,0];Xi(o,r,i);var a=t.shapeHandle.getRight(),s=t.shapeHandle.getUp(),l=t.shapeHandle.getDirection(),u=uo(o,a),c=uo(o,s),d=uo(o,l);t.shapeHandle.setOrigin(i),t.shapeHandle.setScale3([u,c,d])}}