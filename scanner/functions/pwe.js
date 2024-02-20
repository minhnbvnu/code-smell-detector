function pwe(e,t){(!e.part.dmodp||!e.part.dmodq)&&Bi.addRSAMissing(e);var r="";r+=`Private-key-format: v1.3
`,r+="Algorithm: "+lwe(t)+`
`;var i=Bi.mpDenormalize(e.part.n.data);r+="Modulus: "+i.toString("base64")+`
`;var a=Bi.mpDenormalize(e.part.e.data);r+="PublicExponent: "+a.toString("base64")+`
`;var n=Bi.mpDenormalize(e.part.d.data);r+="PrivateExponent: "+n.toString("base64")+`
`;var s=Bi.mpDenormalize(e.part.p.data);r+="Prime1: "+s.toString("base64")+`
`;var o=Bi.mpDenormalize(e.part.q.data);r+="Prime2: "+o.toString("base64")+`
`;var u=Bi.mpDenormalize(e.part.dmodp.data);r+="Exponent1: "+u.toString("base64")+`
`;var l=Bi.mpDenormalize(e.part.dmodq.data);r+="Exponent2: "+l.toString("base64")+`
`;var p=Bi.mpDenormalize(e.part.iqmp.data);r+="Coefficient: "+p.toString("base64")+`
`;var c=new Date;return r+="Created: "+S1(c)+`
`,r+="Publish: "+S1(c)+`
`,r+="Activate: "+S1(c)+`
`,ef.from(r,"ascii")}