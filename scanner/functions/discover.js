function discover() {
			F.C.fade(cover,{from:arg.opacity || 0.5, to: 0, 
				oncomplete:function () {
					F.O.setStyle(cover, "width", 0);
					F.O.setStyle(cover, "height", 0);
					if (jsonArg.ondiscover) {
						jsonArg.ondiscover();
					}
				}		
			});
		}