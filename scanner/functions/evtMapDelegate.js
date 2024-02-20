function evtMapDelegate( evt ){
			 if (!_hasTouch) {
				evt = utils.getPCevts(evt);
			}
			els.forEach(function(el) {
				_delegate(el, evt, sel, evtMap[evt]);
			});
		}