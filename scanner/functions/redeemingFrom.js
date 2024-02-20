function redeemingFrom(string){
		var r = {};
		var decode = coinjs.addressDecode(string);
		if(decode.version == coinjs.pub){ // regular address
			r.addr = string;
			r.from = 'address';
			r.redeemscript = false;
		} else if (decode.version == coinjs.priv){ // wif key
			var a = coinjs.wif2address(string);
			r.addr = a['address'];
			r.from = 'wif';
			r.redeemscript = false;
		} else if (decode.version == coinjs.multisig){ // mulisig address
			r.addr = '';
			r.from = 'multisigAddress';
			r.redeemscript = false;
		} else if(decode.type == 'bech32'){
			r.addr = string;
			r.from = 'bech32';
			r.decodedRs = decode.redeemscript;
			r.redeemscript = true;
		} else {
			var script = coinjs.script();
			var decodeRs = script.decodeRedeemScript(string);
			if(decodeRs){ // redeem script
				r.addr = decodeRs['address'];
				r.from = 'redeemScript';
				r.decodedRs = decodeRs.redeemscript;
				r.type = decodeRs['type'];
				r.redeemscript = true;
				r.decodescript = decodeRs;
			} else { // something else
				if(string.match(/^[a-f0-9]{64}$/i)){
					r.addr = string;
					r.from = 'txid';
					r.redeemscript = false;
				} else {
					r.addr = '';
					r.from = 'other';
					r.redeemscript = false;
				}
			}
		}
		return r;
	}