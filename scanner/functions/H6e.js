function H6e(e,t,r,n){let i=t.head,a=r?1:-1;if(i==(r?e.state.doc.length:0))return ve.cursor(i,t.assoc);let l=t.goalColumn,s,u=e.contentDOM.getBoundingClientRect(),c=e.coordsAtPos(i,t.assoc||-1),d=e.documentTop;if(c)l==null&&(l=c.left-u.left),s=a<0?c.top:c.bottom;else{let p=e.viewState.lineBlockAt(i);l==null&&(l=Math.min(u.right-u.left,e.defaultCharacterWidth*(i-p.from))),s=(a<0?p.top:p.bottom)+d}let f=u.left+l,h=n??e.viewState.heightOracle.textHeight>>1;for(let p=0;;p+=10){let m=s+(h+p)*a,g=Gae(e,{x:f,y:m},!1,a);if(m<u.top||m>u.bottom||(a<0?g<i:g>i)){let b=e.docView.coordsForChar(g),v=!b||m<b.top?-1:1;return ve.cursor(g,v,void 0,l)}}}