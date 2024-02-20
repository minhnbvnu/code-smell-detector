function configureBroadcast(){
		var host = $("#coinjs_broadcast option:selected").val();

        // api:             blockcypher     blockchair      chain.so
        // network name     "btc"           "bitcoin"       "BTC"
        // network name     "ltc"           "litecoin"      "LTC"
        // network name     "doge"          "dogecoin"      "DOGE"

		$("#rawSubmitBtn").unbind("");
		if(host=="chain.so_bitcoinmainnet"){
			$("#rawSubmitBtn").click(function(){
				rawSubmitChainso(this, "BTC");
			});
		} else if(host=="chain.so_litecoin"){
			$("#rawSubmitBtn").click(function(){
				rawSubmitChainso(this, "LTC");
			});
		} else if(host=="chain.so_dogecoin"){
			$("#rawSubmitBtn").click(function(){
				rawSubmitChainso(this, "DOGE");
			});
		} else if(host=="blockcypher_bitcoinmainnet"){
			$("#rawSubmitBtn").click(function(){
				rawSubmitblockcypher(this, "btc");
			});
		} else if(host=="blockcypher_litecoin"){
			$("#rawSubmitBtn").click(function(){
				rawSubmitblockcypher(this, "ltc");
			});
		} else if(host=="blockcypher_dogecoin"){
			$("#rawSubmitBtn").click(function(){
				rawSubmitblockcypher(this, "doge");
			});
		} else if(host=="blockchair_bitcoinmainnet"){
			$("#rawSubmitBtn").click(function(){
				rawSubmitblockchair(this, "bitcoin");
			});
		} else if(host=="blockchair_litecoin"){
			$("#rawSubmitBtn").click(function(){
				rawSubmitblockchair(this, "litecoin");
			});
		} else if(host=="blockchair_dogecoin"){
			$("#rawSubmitBtn").click(function(){
				rawSubmitblockchair(this, "dogecoin");
			});
		} else {
			$("#rawSubmitBtn").click(function(){
				rawSubmitDefault(this); // revert to default
			});
		}
	}