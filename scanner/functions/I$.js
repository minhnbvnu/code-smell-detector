function I$(n){return function(e,i,r,o){for(var s,a,l=M$.getCSR(i),c=l.indices,u=l.indptr,h=0;h<o.length;h++)for(var p=new Set(r[0][h]);;){var d=Qn.smallestFlagged(r,h);if(d===-1)break;var f=c.slice(u[d],u[d+1]);try{for(var m=lE(f),x=m.next();!x.done;x=m.next()){var g=x.value;if(!(g===d||g===-1||p.has(g))){var v=n(e[g],o[h]);Qn.uncheckedHeapPush(r,h,v,g,1),p.add(g)}}}catch(b){s={error:b}}finally{try{x&&!x.done&&(a=m.return)&&a.call(m)}finally{if(s)throw s.error}}}return r}}