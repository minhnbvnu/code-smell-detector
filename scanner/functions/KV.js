function KV(t,e,n,i,r,o){if(!t.dragging){var a=r.getModel("checkpointStyle"),s=i.dataToCoord(r.getData().get("value",n));if(o||!a.get("animation",!0))t.attr({x:s,y:0}),e&&e.attr({shape:{x2:s}});else{var l={duration:a.get("animationDuration",!0),easing:a.get("animationEasing",!0)};t.stopAnimation(null,!0),t.animateTo({x:s,y:0},l),e&&e.animateTo({shape:{x2:s}},l)}}}