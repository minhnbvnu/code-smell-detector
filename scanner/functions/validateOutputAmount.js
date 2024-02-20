function validateOutputAmount(){
		$("#recipients .amount").unbind('');
		$("#recipients .amount").keyup(function(){
			if(isNaN($(this).val())){
				$(this).parent().addClass('has-error');
			} else {
				$(this).parent().removeClass('has-error');
				var f = 0;
				$.each($("#recipients .amount"),function(i,o){
					if(!isNaN($(o).val())){
						f += $(o).val()*1;
					}
				});
				$("#totalOutput").html((f).toFixed(8));
			}
			totalFee();
		}).keyup();
	}