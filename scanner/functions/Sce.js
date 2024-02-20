function Sce(e,t){var r="";if(r+=`Private-key-format: v1.3
`,e.curve==="nistp256")r+=`Algorithm: 13 (ECDSAP256SHA256)
`;else if(e.curve==="nistp384")r+=`Algorithm: 14 (ECDSAP384SHA384)
`;else throw new Error("Unsupported curve");var i=e.part.d.data.toString("base64");r+="PrivateKey: "+i+`
`;var a=new Date;return r+="Created: "+id(a)+`
`,r+="Publish: "+id(a)+`
`,r+="Activate: "+id(a)+`
`,Zp.from(r,"ascii")}