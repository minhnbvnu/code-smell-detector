function review(){
    		$("#review-content").empty()
            var odd=true
    		$('#catalog-create-container').find('.catalog-item-property').each(function(){
                var currentPropReviewItem = $(this)
                var newContainerID = "review-content-"+$(this).attr('id')
                $('#review-content').append('<div id="'+newContainerID+'" class="review-content-prop-item"><h4 class="review-content-prop-item-title">'+$(this).attr('id').replace(/-/g, " ")+'</h4></div>')
                findInput(currentPropReviewItem, newContainerID) //finds and outputs the input values
            })
    	}