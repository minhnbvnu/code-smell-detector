function _off(){
				clearTimeout(seq.step);
				_delete(seq,"step");
				_stop(el);
			}