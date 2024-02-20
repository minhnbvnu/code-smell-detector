function addTrans (paramObj) {
				var from = exist( paramObj.from ) ? paramObj.from : 0 ;
				var to = exist( paramObj.to ) ? paramObj.to : 1 ;
				var d = 100;
				m.addAction( { from: from * d, to: to * d ,ease: paramObj.ease || ag.ease },
					function (value) {
						//document.title = value;
						F.O.setTransparent( element, value/d );
					}
				);
			}