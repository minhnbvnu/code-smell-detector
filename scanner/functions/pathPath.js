function pathPath(g,o){if(o.path==null)return;var p=o.cache||(o.cache=parsePath(o.path));return renderPath(g,p,o.x,o.y)}