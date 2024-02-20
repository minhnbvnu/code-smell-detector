function addInput(address, amount) {
		if($("#recipients .recipient:last .address:last").val() != ""){
			$("#recipients .addressAddTo:first").click();
		};

		$("#recipients .address:last").val(address);
		$("#recipients .amount:last").val(amount);
	}