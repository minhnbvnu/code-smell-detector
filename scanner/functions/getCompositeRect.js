function getCompositeRect(i,o,s){void 0===s&&(s=!1);var u,C,_=isHTMLElement(o),w=isHTMLElement(o)&&isElementScaled(o),P=getDocumentElement(o),B=getBoundingClientRect(i,w,s),z={scrollLeft:0,scrollTop:0},U={x:0,y:0};return(_||!_&&!s)&&(("body"!==getNodeName(o)||isScrollParent(P))&&(z=(u=o)!==getWindow(u)&&isHTMLElement(u)?{scrollLeft:(C=u).scrollLeft,scrollTop:C.scrollTop}:getWindowScroll(u)),isHTMLElement(o)?((U=getBoundingClientRect(o,!0)).x+=o.clientLeft,U.y+=o.clientTop):P&&(U.x=getWindowScrollBarX(P))),{x:B.left+z.scrollLeft-U.x,y:B.top+z.scrollTop-U.y,width:B.width,height:B.height}}