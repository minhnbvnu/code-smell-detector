function registerPointerlockChangeEventCallback(target,userData,useCapture,callbackfunc,eventTypeId,eventTypeString,targetThread){if(!JSEvents.pointerlockChangeEvent)JSEvents.pointerlockChangeEvent=_malloc(260);var pointerlockChangeEventHandlerFunc=function(ev){var e=ev||event;var pointerlockChangeEvent=JSEvents.pointerlockChangeEvent;fillPointerlockChangeEventData(pointerlockChangeEvent);if(function(a1,a2,a3){return dynCall_iiii.apply(null,[callbackfunc,a1,a2,a3])}(eventTypeId,pointerlockChangeEvent,userData))e.preventDefault()};var eventHandler={target:target,eventTypeString:eventTypeString,callbackfunc:callbackfunc,handlerFunc:pointerlockChangeEventHandlerFunc,useCapture:useCapture};JSEvents.registerOrRemoveHandler(eventHandler)}