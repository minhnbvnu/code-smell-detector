function JTe(e,t,r){const n=e.all(t),i=r?eRe(r):Vse(t),a={},l=[];if(typeof t.checked=="boolean"){const d=n[0];let f;d&&d.type==="element"&&d.tagName==="p"?f=d:(f={type:"element",tagName:"p",properties:{},children:[]},n.unshift(f)),f.children.length>0&&f.children.unshift({type:"text",value:" "}),f.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),a.className=["task-list-item"]}let s=-1;for(;++s<n.length;){const d=n[s];(i||s!==0||d.type!=="element"||d.tagName!=="p")&&l.push({type:"text",value:`
`}),d.type==="element"&&d.tagName==="p"&&!i?l.push(...d.children):l.push(d)}const u=n[n.length-1];u&&(i||u.type!=="element"||u.tagName!=="p")&&l.push({type:"text",value:`
`});const c={type:"element",tagName:"li",properties:a,children:l};return e.patch(t,c),e.applyData(t,c)}