function stepNext(callback){
			$("#catalog-create-step-" + currentStep).animate({"left":"-300px", "opacity":"0"}, function(){
    			$("#catalog-create-step-" + currentStep).show(0).removeClass("front")
    			$(".step-button[data-step='"+currentStep+"']").removeClass("btn-info active")
    			currentStep+=1
    			$("#catalog-create-step-" + currentStep).show(0).animate({"left":"0px", "opacity":"100"}).addClass("front")
    			$("button[data-step='"+currentStep+"']").addClass("btn-info active")
    			if(currentStep==totalSteps){
    				nextBtn.hide()
    				createBtn.show()
    				review()
    			}
    			if(currentStep>1){
    				backBtn.show()
    			}
    			adjustHeight()
    			callback()
    		})
		}