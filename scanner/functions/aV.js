function aV(t,e,n,i,r){var o=e&&e.painter;if(n){var a=o&&o.getViewportRoot();a&&function(t,e,n,i,r){te(Qt,e,i,r,!0)&&te(t,n,Qt[0],Qt[1])}(t,a,document.body,i,r)}else{t[0]=i,t[1]=r;var s=o&&o.getViewportRootOffset();s&&(t[0]+=s.offsetLeft,t[1]+=s.offsetTop)}t[2]=t[0]/e.getWidth(),t[3]=t[1]/e.getHeight()}