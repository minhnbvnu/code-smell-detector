function rawSubmitblockchair(thisbtn, network){
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
                $.ajax ({
                        type: "POST",
                        url: "https://api.blockchair.com/"+network+"/push/transaction",
                        data: {"data":$("#rawTransaction").val()},
                        dataType: "json",
                        error: function(data) {
				var r = 'Failed to broadcast: error code=' + data.status.toString() + ' ' + data.statusText;
				$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			//	console.error(JSON.stringify(data, null, 4));
                        },
                        success: function(data) {
			//	console.info(JSON.stringify(data, null, 4));
				if((data.context && data.data) && data.context.code=='200'){
					$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden")
                    .html(' TXID: ' + data.data.transaction_hash + '<br> <a href="https://blockchair.com/'+network+'/transaction/' + data.data.transaction_hash + '" target="_blank">View on Blockchain Explorer</a>');
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