function getInnerBoundingClientRect(i,o){var s=getBoundingClientRect(i,!1,"fixed"===o);return s.top=s.top+i.clientTop,s.left=s.left+i.clientLeft,s.bottom=s.top+i.clientHeight,s.right=s.left+i.clientWidth,s.width=i.clientWidth,s.height=i.clientHeight,s.x=s.left,s.y=s.top,s}