function onInputBtnClicked(e){
	var method = $(this).attr('id');
	client.rpc(method, $('input#'+method).val(), parseReply);
	$('input#'+method).val('');
}