function decodePubKey(){
		var pubkey = $("#verifyScript").val();
		if(pubkey.length==66 || pubkey.length==130){
			try {
				$("#verifyPubKey .verifyDataSw").addClass('hidden');
				$("#verifyPubKey .address").val(coinjs.pubkey2address(pubkey));
				if(pubkey.length == 66){
					var sw = coinjs.segwitAddress(pubkey);
					$("#verifyPubKey .addressSegWit").val(sw.address);
					$("#verifyPubKey .addressSegWitRedeemScript").val(sw.redeemscript);

					var b32 = coinjs.bech32Address(pubkey);
					$("#verifyPubKey .addressBech32").val(b32.address);
					$("#verifyPubKey .addressBech32RedeemScript").val(b32.redeemscript);

					$("#verifyPubKey .verifyDataSw").removeClass('hidden');
				}
				$("#verifyPubKey").removeClass("hidden");
				$(".verifyLink").attr('href','?verify='+$("#verifyScript").val());
				return true;
			} catch (e) {
				return false;
			}
		} else {
			return false;
		}
	}