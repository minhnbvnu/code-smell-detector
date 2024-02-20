function sendAjax(){
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});

	let page = $("body").find("#Sb_content").data('page')
	let slug = $("body").find("#Sb_content").data('slug')
	let data = {
		"paginationId" : paginationId,
		"page" : page,
		"slug" : slug,
	}

	$.ajax({
		url: '/home/publishing/history-show',
		type: 'POST',
		data : data,
		dataProcess : false,
		cache : false,
		success : (r)=>{
			$('#sb_loader').empty();
			if(r.html.length > 0){
				$('body').find('#table-div tbody').append(r.html)
				paginate = true;
			}

			else{
				$("#table-div").append(`
						<p style="width:100%;padding:10px;text-align:center; color:white">End of content</p>
					`)
			}
		}
	})
}