function spe(e,t,r){r.peek()===ct.Ber.Integer&&(Eo.strictEqual(t,"private","unexpected Integer at start of public key"),r.readString(ct.Ber.Integer,!0)),r.readSequence();var i=r.offset+r.length,a=r.readOID();switch(a){case"1.2.840.113549.1.1.1":return r._offset=i,t==="public"?ope(r):upe(r);case"1.2.840.10040.4.1":return t==="public"?lpe(r):ppe(r);case"1.2.840.10045.2.1":return t==="public"?fpe(r):cpe(r);case"1.3.101.112":return t==="public"?dpe(r):hpe(r);case"1.3.101.110":return t==="public"?mpe(r):gpe(r);default:throw new Error("Unknown key type OID "+a)}}