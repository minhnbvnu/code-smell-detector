function KeyUsage(t){var o;_classCallCheck(this,KeyUsage);var c=["","yes","no"];(o=r.call(this,_,"keyUsage")).crlSign=(0,d.getStringOption)(t.crlSign,c);o.dataEncipherment=(0,d.getStringOption)(t.dataEncipherment,c);o.decipherOnly=(0,d.getStringOption)(t.decipherOnly,c);o.digitalSignature=(0,d.getStringOption)(t.digitalSignature,c);o.encipherOnly=(0,d.getStringOption)(t.encipherOnly,c);o.id=t.id||"";o.keyAgreement=(0,d.getStringOption)(t.keyAgreement,c);o.keyCertSign=(0,d.getStringOption)(t.keyCertSign,c);o.keyEncipherment=(0,d.getStringOption)(t.keyEncipherment,c);o.nonRepudiation=(0,d.getStringOption)(t.nonRepudiation,c);o.type=(0,d.getStringOption)(t.type,["optional","required"]);o.use=t.use||"";o.usehref=t.usehref||"";return o}