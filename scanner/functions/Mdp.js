function Mdp(t){var o;_classCallCheck(this,Mdp);(o=r.call(this,_,"mdp")).id=t.id||"";o.permissions=(0,d.getInteger)({data:t.permissions,defaultValue:2,validate:function validate(t){return 1===t||3===t}});o.signatureType=(0,d.getStringOption)(t.signatureType,["filler","author"]);o.use=t.use||"";o.usehref=t.usehref||"";return o}