function gke(e,t,r,i){if(t=ie.fromDer(t,r),t.tagClass!==ie.Class.UNIVERSAL||t.type!==ie.Type.SEQUENCE||t.constructed!==!0)throw new Error("PKCS#12 AuthenticatedSafe expected to be a SEQUENCE OF ContentInfo");for(var a=0;a<t.value.length;a++){var n=t.value[a],s={},o=[];if(!ie.validate(n,IJ,s,o)){var u=new Error("Cannot read ContentInfo.");throw u.errors=o,u}var l={encrypted:!1},p=null,c=s.content.value[0];switch(ie.derToOid(s.contentType)){case sr.oids.data:if(c.tagClass!==ie.Class.UNIVERSAL||c.type!==ie.Type.OCTETSTRING)throw new Error("PKCS#12 SafeContents Data is not an OCTET STRING.");p=IE(c).value;break;case sr.oids.encryptedData:p=vke(c,i),l.encrypted=!0;break;default:var u=new Error("Unsupported PKCS#12 contentType.");throw u.contentType=ie.derToOid(s.contentType),u}l.safeBags=yke(p,r,i),e.safeContents.push(l)}}