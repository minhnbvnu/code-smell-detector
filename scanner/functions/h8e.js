function h8e(e){let t=FI.parse(e);return(r,n,i,a)=>{let{text:l,ranges:s}=t.instantiate(r.state,i),u={changes:{from:i,to:a,insert:qt.of(l)},scrollIntoView:!0,annotations:n?[o8e.of(n),hn.userEvent.of("input.complete")]:void 0};if(s.length&&(u.selection=DI(s,0)),s.some(c=>c.field>0)){let c=new Od(s,0),d=u.effects=[lp.of(c)];r.state.field(Sh,!1)===void 0&&d.push(Ar.appendConfig.of([Sh,b8e,y8e,s8e]))}r.dispatch(r.state.update(u))}}