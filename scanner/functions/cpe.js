function cpe(e){var t=R8(e);Eo.string(t,"a known elliptic curve"),e.readSequence(ct.Ber.OctetString),e.readSequence();var r=$i(e,"version");Eo.equal(r[0],1,"unknown version of ECDSA key");var i=e.readString(ct.Ber.OctetString,!0),a;if(e.peek()==160&&(e.readSequence(160),e._offset+=e.length),e.peek()==161&&(e.readSequence(161),a=e.readString(ct.Ber.BitString,!0),a=Rr.ecNormalize(a)),a===void 0){var n=Rr.publicFromPrivateECDSA(t,i);a=n.part.Q.data}var s={type:"ecdsa",parts:[{name:"curve",data:bl.from(t)},{name:"Q",data:a},{name:"d",data:i}]};return new _o(s)}