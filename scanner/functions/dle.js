function dle(e,t){let r,{newSel:n}=t,i=e.state.selection.main,a=e.inputState.lastKeyTime>Date.now()-100?e.inputState.lastKeyCode:-1;if(t.bounds){let{from:l,to:s}=t.bounds,u=i.from,c=null;(a===8||je.android&&t.text.length<s-l)&&(u=i.to,c="end");let d=ASe(e.state.doc.sliceString(l,s,vf),t.text,u-l,c);d&&(je.chrome&&a==13&&d.toB==d.from+2&&t.text.slice(d.from,d.toB)==vf+vf&&d.toB--,r={from:l+d.from,to:l+d.toA,insert:qt.of(t.text.slice(d.from,d.toB).split(vf))})}else n&&(!e.hasFocus&&e.state.facet(fb)||n.main.eq(i))&&(n=null);if(!r&&!n)return!1;if(!r&&t.typeOver&&!i.empty&&n&&n.main.empty?r={from:i.from,to:i.to,insert:e.state.doc.slice(i.from,i.to)}:r&&r.from>=i.from&&r.to<=i.to&&(r.from!=i.from||r.to!=i.to)&&i.to-i.from-(r.to-r.from)<=4?r={from:i.from,to:i.to,insert:e.state.doc.slice(i.from,r.from).append(r.insert).append(e.state.doc.slice(r.to,i.to))}:(je.mac||je.android)&&r&&r.from==r.to&&r.from==i.head-1&&/^\. ?$/.test(r.insert.toString())&&e.contentDOM.getAttribute("autocorrect")=="off"?(n&&r.insert.length==2&&(n=ve.single(n.main.anchor-1,n.main.head-1)),r={from:i.from,to:i.to,insert:qt.of([" "])}):je.chrome&&r&&r.from==r.to&&r.from==i.head&&r.insert.toString()==`
 `&&e.lineWrapping&&(n&&(n=ve.single(n.main.anchor-1,n.main.head-1)),r={from:i.from,to:i.to,insert:qt.of([" "])}),r){if(je.ios&&e.inputState.flushIOSKey()||je.android&&(r.from==i.from&&r.to==i.to&&r.insert.length==1&&r.insert.lines==2&&Tc(e.contentDOM,"Enter",13)||(r.from==i.from-1&&r.to==i.to&&r.insert.length==0||a==8&&r.insert.length<r.to-r.from&&r.to>i.head)&&Tc(e.contentDOM,"Backspace",8)||r.from==i.from&&r.to==i.to+1&&r.insert.length==0&&Tc(e.contentDOM,"Delete",46)))return!0;let l=r.insert.toString();e.inputState.composing>=0&&e.inputState.composing++;let s,u=()=>s||(s=PSe(e,r,n));return e.state.facet(Vae).some(c=>c(e,r.from,r.to,l,u))||e.dispatch(u()),!0}else if(n&&!n.main.eq(i)){let l=!1,s="select";return e.inputState.lastSelectionTime>Date.now()-50&&(e.inputState.lastSelectionOrigin=="select"&&(l=!0),s=e.inputState.lastSelectionOrigin),e.dispatch({selection:n,scrollIntoView:l,userEvent:s}),!0}else return!1}