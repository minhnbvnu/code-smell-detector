function evtMapBind(evt){
			if (!_hasTouch) {
				evt = utils.getPCevts(evt);
			}
			els.forEach(function(el) {
				_bind(el, evt, evtMap[evt]);
			});
		}