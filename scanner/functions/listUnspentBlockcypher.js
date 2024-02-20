function listUnspentBlockcypher(redeem,network){
		$.ajax ({
			type: "GET",
			url: "https://api.blockcypher.com/v1/"+network+"/main/addrs/"+redeem.addr+"?includeScript=true&unspentOnly=true",
			dataType: "json",
			error: function(data) {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs!');
			},
			success: function(data) {
				if (data.address) { // address field will always be present, txrefs is only present if there are UTXOs
					$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="'+explorer_addr+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
					for(var i in data.txrefs){
						var o = data.txrefs[i];
						var tx = ((""+o.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
						if(tx.match(/^[a-f0-9]+$/)){
							var n = o.tx_output_n;
							var script = (redeem.redeemscript==true) ? redeem.decodedRs : o.script;
							var amount = ((o.value.toString()*1)/100000000).toFixed(8);
							addOutput(tx, n, script, amount);
						}
					}
				} else {
					$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs.');
				}
			},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}