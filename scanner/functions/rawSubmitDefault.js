function rawSubmitDefault(btn){ 
		var thisbtn = btn;		
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		$.ajax ({
			type: "POST",
			url: coinjs.host+'?uid='+coinjs.uid+'&key='+coinjs.key+'&setmodule=bitcoin&request=sendrawtransaction',
			data: {'rawtx':$("#rawTransaction").val()},
			dataType: "xml",
			error: function(data) {
				$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(" There was an error submitting your request, please try again").prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			},
                        success: function(data) {
				$("#rawTransactionStatus").html(unescape($(data).find("response").text()).replace(/\+/g,' ')).removeClass('hidden');
				if($(data).find("result").text()==1){
					$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(' TXID: ' + $(data).find("txid").text() + '<br> <a href="https://coinb.in/tx/' + $(data).find("txid").text() + '" target="_blank">View on Blockchain</a>');
				} else {
					$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span> ');
				}
			},
			complete: function(data, status) {
				$("#rawTransactionStatus").fadeOut().fadeIn();
				$(thisbtn).val('Submit').attr('disabled',false);				
			}
		});
	}