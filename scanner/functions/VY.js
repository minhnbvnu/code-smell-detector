function VY(e,t){t.classHierarchy.push("vtkTrackballManipulator");var n=0,r=0;e.handleEvent=function(e,i){var o=LY(n,r,e.position.x,e.position.y,t.origin,t.normal,e.pokedRenderer);return n=e.position.x,r=e.position.y,o},e.reset=function(e){n=e.position.x,r=e.position.y}}