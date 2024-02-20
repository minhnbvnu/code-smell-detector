function rawSubmitblockcypher(thisbtn, network){ 
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		$.ajax ({
			type: "POST",
			url: "https://api.blockcypher.com/v1/"+network+"/main/txs/push",
			data: JSON.stringify({"tx":$("#rawTransaction").val()}),
			error: function(data) {
				var r = 'Failed to broadcast: error code=' + data.status.toString() + ' ' + data.statusText;
				$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			},
                        success: function(data) {
				if((data.tx) && data.tx.hash){
					$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden")
                    .html(' TXID: ' + data.tx.hash + '<br> <a href="https://live.blockcypher.com/'+network+'/tx/' + data.tx.hash + '" target="_blank">View on Blockchain Explorer</a>');
				} else {
					$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
				}
			},
			complete: function(data, status) {
				$("#rawTransactionStatus").fadeOut().fadeIn();
				$(thisbtn).val('Submit').attr('disabled',false);				
			}
		});
	}