function walletBalance(){
		if($("#walletLoader").hasClass("hidden")){
			var tx = coinjs.transaction();
			$("#walletLoader").removeClass("hidden");
			coinjs.addressBalance($("#walletAddress").html(),function(data){
				if($(data).find("result").text()==1){
					var v = $(data).find("balance").text()/100000000;
					$("#walletBalance").html(v+" BTC").attr('rel',v).fadeOut().fadeIn();
				} else {
				$("#walletBalance").html("0.00 BTC").attr('rel',v).fadeOut().fadeIn();
				}

				$("#walletLoader").addClass("hidden");
			});
		}
	}