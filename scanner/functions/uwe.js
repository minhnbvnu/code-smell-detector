function uwe(e,t){if(Gn[e].match(/^RSA-/))return owe(t);if(Gn[e]==="ECDSA-P384-SHA384"||Gn[e]==="ECDSA-P256-SHA256"){var r=ef.from(t[0].split(" ")[1],"base64"),i="nistp384",a=384;Gn[e]==="ECDSA-P256-SHA256"&&(i="nistp256",a=256);var n=Bi.publicFromPrivateECDSA(i,r),s=n.part.Q.data,o={type:"ecdsa",curve:i,size:a,parts:[{name:"curve",data:ef.from(i)},{name:"d",data:r},{name:"Q",data:s}]};return new G7(o)}throw new Error("Unsupported algorithm: "+Gn[e])}