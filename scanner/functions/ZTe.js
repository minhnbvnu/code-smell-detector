function ZTe(e,t){const r=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",n=String(t.identifier).toUpperCase(),i=wd(n.toLowerCase()),a=e.footnoteOrder.indexOf(n);let l,s=e.footnoteCounts.get(n);s===void 0?(s=0,e.footnoteOrder.push(n),l=e.footnoteOrder.length):l=a+1,s+=1,e.footnoteCounts.set(n,s);const u={type:"element",tagName:"a",properties:{href:"#"+r+"fn-"+i,id:r+"fnref-"+i+(s>1?"-"+s:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(l)}]};e.patch(t,u);const c={type:"element",tagName:"sup",properties:{},children:[u]};return e.patch(t,c),e.applyData(t,c)}