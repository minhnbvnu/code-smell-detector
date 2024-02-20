function toggleByDataShow(){
            //find all form-group and show or hide it depending on the data-show="true/false"
            $(".form-group").each(function(){
                if($(this).attr('data-show')==false)
                    $(this).hide()
                else
                    $(this).show()
            })
		}