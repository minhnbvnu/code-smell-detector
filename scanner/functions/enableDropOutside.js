function enableDropOutside(){
		addEvent(document,'drop',function(e){
			removeClass();
			no(e);
		});
	}