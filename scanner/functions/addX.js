function addX () {
				m.addAction({from:ag.from.x,to:ag.to.x},
					function(value){
						if (ag.scroll) {
							element.scrollLeft  = value;
						}
						else {
							F.O.setStyle(element,"left",value);
						}
						
					}
				);
			}