function tle(e,t){let{state:r}=e,n,i=1,a=r.toText(t),l=a.lines==r.selection.ranges.length;if(AD!=null&&r.selection.ranges.every(u=>u.empty)&&AD==a.toString()){let u=-1;n=r.changeByRange(c=>{let d=r.doc.lineAt(c.from);if(d.from==u)return{range:c};u=d.from;let f=r.toText((l?a.line(i++).text:t)+r.lineBreak);return{changes:{from:d.from,insert:f},range:ve.cursor(c.from+f.length)}})}else l?n=r.changeByRange(u=>{let c=a.line(i++);return{changes:{from:u.from,to:u.to,insert:c.text},range:ve.cursor(u.from+c.length)}}):n=r.replaceSelection(a);e.dispatch(n,{userEvent:"input.paste",scrollIntoView:!0})}