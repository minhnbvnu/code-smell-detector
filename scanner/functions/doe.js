function doe(e,t,r){if(e.readOnly)return!1;let n=[];for(let i of xb(e))r?n.push({from:i.from,insert:e.doc.slice(i.from,i.to)+e.lineBreak}):n.push({from:i.to,insert:e.lineBreak+e.doc.slice(i.from,i.to)});return t(e.update({changes:n,scrollIntoView:!0,userEvent:"input.copyline"})),!0}