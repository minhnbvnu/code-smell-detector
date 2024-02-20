function totalFee(){
		var fee = (($("#totalInput").html()*1) - ($("#totalOutput").html()*1)).toFixed(8);
		$("#transactionFee").val((fee>0)?fee:'0.00');
	}