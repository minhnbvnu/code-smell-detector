function lRe(e,t){const r=e.all(t),n=r.shift(),i=[];if(n){const l={type:"element",tagName:"thead",properties:{},children:e.wrap([n],!0)};e.patch(t.children[0],l),i.push(l)}if(r.length>0){const l={type:"element",tagName:"tbody",properties:{},children:e.wrap(r,!0)},s=jse(t.children[1]),u=zse(t.children[t.children.length-1]);s&&u&&(l.position={start:s,end:u}),i.push(l)}const a={type:"element",tagName:"table",properties:{},children:e.wrap(i,!0)};return e.patch(t,a),e.applyData(t,a)}