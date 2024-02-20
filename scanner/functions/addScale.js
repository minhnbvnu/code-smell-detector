function addScale (paramObj) {		
				var from = exist( paramObj.from ) ? paramObj.from : 0 ;
				var to = exist( paramObj.to ) ? paramObj.to : 1 ;
				var d = 100;
				var origin = paramObj.center? "center center":"left top";
				
				F.O.setOrigin(element, origin);
				m.addAction( { from: from * d, to: to * d ,ease: paramObj.ease || ag.ease },
					function (value) {
						//document.title = value;
						F.O.setScale( element, value/d );
						if (paramObj.center && F.U.isIE()) {
							F.O.setStyle(element,"left",oX -(element.offsetWidth-oW)/2);
							F.O.setStyle(element,"top",oY  - (element.offsetHeight-oH)/2);
						}		
					}
				);
			}