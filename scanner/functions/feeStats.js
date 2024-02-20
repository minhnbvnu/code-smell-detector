function feeStats(){
		$("#feeStatsReload").attr('disabled',true);
		$.ajax ({
			type: "GET",
			url: "https://coinb.in/api/?uid=1&key=12345678901234567890123456789012&setmodule=fees&request=stats",
			dataType: "xml",
			error: function(data) {
			},
			success: function(data) {
				$("#fees .recommended .blockHeight").html('<a href="https://coinb.in/height/'+$(data).find("height").text()+'" target="_blank">'+$(data).find("height").text()+'</a>');
				$("#fees .recommended .blockHash").html($(data).find("block").text());
				$("#fees .recommended .blockTime").html($(data).find("timestamp").text());
				$("#fees .recommended .blockDateTime").html(unescape($(data).find("datetime").text()).replace(/\+/g,' '));
				$("#fees .recommended .txId").html('<a href="https://coinb.in/tx/'+$(data).find("txid").text()+'" target="_blank">'+$(data).find("txid").text()+'</a>');
				$("#fees .recommended .txSize").html($(data).find("txsize").text());
				$("#fees .recommended .txFee").html($(data).find("txfee").text());
				$("#fees .feeSatByte").html($(data).find("satbyte").text());

				mathFees();
			},
			complete: function(data, status){
				$("#feeStatsReload").attr('disabled', false);
			}
		});
	}