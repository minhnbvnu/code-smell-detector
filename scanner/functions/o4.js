function o4(n,t){let e=t.substring(n.start,n.end-1);if(n.parsedCssText=n.cssText=e.trim(),n.parent){let r=n.previous?n.previous.end:n.parent.start;e=t.substring(r,n.start-1),e=$B(e),e=e.replace(Yr.multipleSpaces," "),e=e.substring(e.lastIndexOf(";")+1);let o=n.parsedSelector=n.selector=e.trim();n.atRule=o.indexOf(XB)===0,n.atRule?o.indexOf(qB)===0?n.type=Kr.MEDIA_RULE:o.match(Yr.keyframesRule)&&(n.type=Kr.KEYFRAMES_RULE,n.keyframesName=n.selector.split(Yr.multipleSpaces).pop()):o.indexOf(l4)===0?n.type=Kr.MIXIN_RULE:n.type=Kr.STYLE_RULE}let i=n.rules;if(i)for(let r=0,o=i.length,s;r<o&&(s=i[r]);r++)o4(s,t);return n}