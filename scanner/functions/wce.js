function wce(e,t){(!e.part.dmodp||!e.part.dmodq)&&Li.addRSAMissing(e);var r="";r+=`Private-key-format: v1.3
`,r+="Algorithm: "+bce(t)+`
`;var i=Li.mpDenormalize(e.part.n.data);r+="Modulus: "+i.toString("base64")+`
`;var a=Li.mpDenormalize(e.part.e.data);r+="PublicExponent: "+a.toString("base64")+`
`;var n=Li.mpDenormalize(e.part.d.data);r+="PrivateExponent: "+n.toString("base64")+`
`;var s=Li.mpDenormalize(e.part.p.data);r+="Prime1: "+s.toString("base64")+`
`;var o=Li.mpDenormalize(e.part.q.data);r+="Prime2: "+o.toString("base64")+`
`;var u=Li.mpDenormalize(e.part.dmodp.data);r+="Exponent1: "+u.toString("base64")+`
`;var l=Li.mpDenormalize(e.part.dmodq.data);r+="Exponent2: "+l.toString("base64")+`
`;var p=Li.mpDenormalize(e.part.iqmp.data);r+="Coefficient: "+p.toString("base64")+`
`;var c=new Date;return r+="Created: "+id(c)+`
`,r+="Publish: "+id(c)+`
`,r+="Activate: "+id(c)+`
`,Zp.from(r,"ascii")}