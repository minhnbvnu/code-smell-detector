function vg_axisTicksExtend(orient,ticks,oldScale,newScale,size){var sign=orient==="left"||orient==="top"?-1:1;if(size===Infinity){size=orient==="top"||orient==="bottom"?{group:"mark.group.height",mult:-sign}:{group:"mark.group.width",mult:-sign}}else{size={value:sign*size}}if(orient==="top"||orient==="bottom"){vg.extend(ticks.properties.enter,{x:oldScale,y:{value:0},y2:size});vg.extend(ticks.properties.update,{x:newScale,y:{value:0},y2:size});vg.extend(ticks.properties.exit,{x:newScale})}else{vg.extend(ticks.properties.enter,{x:{value:0},x2:size,y:oldScale});vg.extend(ticks.properties.update,{x:{value:0},x2:size,y:newScale});vg.extend(ticks.properties.exit,{y:newScale})}}