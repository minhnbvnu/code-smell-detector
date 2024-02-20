function yTe(e,t){let r=-1;const n=[];let i;for(;++r<e.length;){const a=e[r];let l;if(typeof a=="string")l=a;else switch(a){case-5:{l="\r";break}case-4:{l=`
`;break}case-3:{l=`\r
`;break}case-2:{l=t?" ":"	";break}case-1:{if(!t&&i)continue;l=" ";break}default:l=String.fromCharCode(a)}i=a===-2,n.push(l)}return n.join("")}