function Jwe(e,t,r,n,i,a,l){let s=n.parent,u={from:i.from,to:i.to},c=0,d=s==null?void 0:s.cursor();if(d&&(r<0?d.childBefore(n.from):d.childAfter(n.to)))do if(r<0?d.to<=n.from:d.from>=n.to){if(c==0&&a.indexOf(d.type.name)>-1&&d.from<d.to){let f=VD(d);return{start:u,end:f?{from:f.from,to:f.to}:void 0,matched:!0}}else if(QD(d.type,r,l))c++;else if(QD(d.type,-r,l)){if(c==0){let f=VD(d);return{start:u,end:f&&f.from<f.to?{from:f.from,to:f.to}:void 0,matched:!1}}c--}}while(r<0?d.prevSibling():d.nextSibling());return{start:u,matched:!1}}