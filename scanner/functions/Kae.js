function Kae(e,t){let r=e.observer.selectionRange,n=r.focusNode&&Yae(r.focusNode,r.focusOffset,0);if(!n)return null;let i=t-n.offset;return{from:i,to:i+n.node.nodeValue.length,node:n.node}}