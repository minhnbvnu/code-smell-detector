function lL(t,e){var n=z(t._covers,(function(t){var e=t.__brushOption,n=T(e.range);return{brushType:e.brushType,panelId:e.panelId,range:n}}));t.trigger("brush",{areas:n,isEnd:!!e.isEnd,removeOnClick:!!e.removeOnClick})}