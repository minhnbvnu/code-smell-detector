function listUnspentBlockchair(redeem,network){
		$.ajax ({
			type: "GET",
			url: "https://api.blockchair.com/"+network+"/dashboards/address/"+redeem.addr,
			dataType: "json",
			error: function(data) {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs!');
			},
			success: function(data) {
				if((data.context && data.data) && data.context.code =='200'){
					$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="'+explorer_addr+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
					var all_info = data.data[redeem.addr];
					for(var i in all_info.utxo){
						var o = all_info.utxo[i];
						var tx = ((""+o.transaction_hash).match(/.{1,2}/g).reverse()).join("")+'';
						if(tx.match(/^[a-f0-9]+$/)){
							var n = o.index;
							var script = (redeem.redeemscript==true) ? redeem.decodedRs : all_info.address.script_hex;
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