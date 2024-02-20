function singleConstructor(ctor, ctorSpecial){
		return function(){
			var a = arguments, t = a, a0 = a[0], f;

			if(!(this instanceof a.callee)){
				// not called via new, so force it
				return applyNew(a);
			}

			//this._inherited = {};
			// perform the shaman's rituals of the original dojo.declare()
			// 1) call two types of the preamble
			if(ctorSpecial){
				// full blown ritual
				if(a0){
					// process the preamble of the 1st argument
					f = a0.preamble;
					if(f){
						t = f.apply(this, t) || t;
					}
				}
				f = this.preamble;
				if(f){
					// process the preamble of this class
					f.apply(this, t);
					// one peculiarity of the preamble:
					// it is called even if it is not needed,
					// e.g., there is no constructor to call
					// let's watch for the last constructor
					// (see ticket #9795)
				}
			}
			// 2) call a constructor
			if(ctor){
				ctor.apply(this, a);
			}
			// 3) continue the original ritual: call the postscript
			f = this.postscript;
			if(f){
				f.apply(this, a);
			}
		};
	}