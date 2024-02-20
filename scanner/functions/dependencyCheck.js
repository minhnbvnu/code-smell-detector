function dependencyCheck(){

    		//this will be moved somewhere else, just checking on a click to toggle advanced fields
            $(".advanced-btn").unbind().on('click', function () {
                var advancedProp = $(this).data('advanced-prop-id')
                if(!$('#'+advancedProp).is(':visible'))
                    $('#'+advancedProp).show().css("display", "flex")
				else
                    $('#'+advancedProp).hide().css("display", "none")
                adjustHeight()
            })

            //Dependencies - hide and show depending on other input value
            $(".dependency").on('change', function () {
                switch($(this).context.type){
                    case "checkbox": var val = $(this).context.checked; break;
                    case "radio": var val = $(this).context.checked; break;
                    case "select-one": var val = $(this).context.value; break;
                    default: break;
                }
                var dependencyValue = $(this).context.dataset.dependencyValue
                var dependency = $(this).context.dataset.dependency
                if(val == dependencyValue){
                    switch($(this).context.type){
                        case "checkbox":
                            if($('#'+dependency).data('default-val')==true)
                            	$('#'+dependency)[0].checked = true
                            else
                                $('#'+dependency)[0].checked = false

                            break
                        default:
                            $('#'+dependency).val($('#'+dependency).data('default-val')).change()
                            break
                    }
					$('.'+dependency+'_group').hide().attr("data-show", "0")
                }else{
                    $('.'+dependency+'_group').show().attr("data-show", "1")
                }
            })
            toggleByDataShow()
		}