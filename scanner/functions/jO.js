function jO(t,e,n){var i,r,o,a=t;if("text"===e)o=a;else{o={},_t(a,"text")&&(o.text=a.text),_t(a,"rich")&&(o.rich=a.rich),_t(a,"textFill")&&(o.fill=a.textFill),_t(a,"textStroke")&&(o.stroke=a.textStroke),_t(a,"fontFamily")&&(o.fontFamily=a.fontFamily),_t(a,"fontSize")&&(o.fontSize=a.fontSize),_t(a,"fontStyle")&&(o.fontStyle=a.fontStyle),_t(a,"fontWeight")&&(o.fontWeight=a.fontWeight),r={type:"text",style:o,silent:!0},i={};var s=_t(a,"textPosition");n?i.position=s?a.textPosition:"inside":s&&(i.position=a.textPosition),_t(a,"textPosition")&&(i.position=a.textPosition),_t(a,"textOffset")&&(i.offset=a.textOffset),_t(a,"textRotation")&&(i.rotation=a.textRotation),_t(a,"textDistance")&&(i.distance=a.textDistance)}return qO(o,t),E(o.rich,(function(t){qO(t,t)})),{textConfig:i,textContent:r}}