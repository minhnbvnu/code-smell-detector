function addWidth () {
				m.addAction({from:ag.from.width,to:ag.to.width},
					function(value){
							F.O.setStyle(element,"width",value);	
					}
				);
			}