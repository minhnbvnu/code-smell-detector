function KJ(e,t){t.classHierarchy.push("vtkPlaneWidget");var n=null;e.setDisplayCallback=function(e){return t.representations[0].setDisplayCallback(e)},e.updateCursor=function(){switch(t.activeState.getUpdateMethodName()){case"updateFromOrigin":t.apiSpecificRenderWindow.setCursor("crosshair");break;case"updateFromPlane":t.apiSpecificRenderWindow.setCursor("move");break;case"updateFromNormal":t.apiSpecificRenderWindow.setCursor("alias");break;default:t.apiSpecificRenderWindow.setCursor("grabbing")}},e.handleLeftButtonPress=function(r){return t.activeState&&t.activeState.getActive()&&t.pickable?(n=!0,t.lineManipulator.setOrigin(t.widgetState.getOrigin()),t.planeManipulator.setOrigin(t.widgetState.getOrigin()),t.trackballManipulator.reset(r),t.interactor.requestAnimation(e),e.invokeStartInteractionEvent(),Se.EVENT_ABORT):Se.VOID},e.handleMouseMove=function(r){return n&&t.pickable?e.handleEvent(r):Se.VOID},e.handleLeftButtonRelease=function(){n&&t.pickable&&(e.invokeEndInteractionEvent(),t.interactor.cancelAnimation(e)),n=!1,t.widgetState.deactivate()},e.handleEvent=function(n){return t.pickable&&t.activeState&&t.activeState.getActive()?(e[t.activeState.getUpdateMethodName()](n),e.invokeInteractionEvent(),Se.EVENT_ABORT):Se.VOID},e.updateFromOrigin=function(e){t.planeManipulator.setNormal(t.widgetState.getNormal());var n=t.planeManipulator.handleEvent(e,t.apiSpecificRenderWindow);t.widgetState.containsPoint(n)&&t.activeState.setOrigin(n)},e.updateFromPlane=function(e){var n;t.lineManipulator.setNormal(t.activeState.getNormal());var r=t.lineManipulator.handleEvent(e,t.apiSpecificRenderWindow);(n=t.widgetState).containsPoint.apply(n,y(r))&&t.activeState.setOrigin(r)},e.updateFromNormal=function(e){t.trackballManipulator.setNormal(t.activeState.getNormal());var n=t.trackballManipulator.handleEvent(e,t.apiSpecificRenderWindow);t.activeState.setNormal(n)},t.lineManipulator=kY.newInstance(),t.planeManipulator=BY.newInstance(),t.trackballManipulator=UY.newInstance()}