function wrapquote(qfn, f){
		return function(ctxt){
			return qfn( String( f.call(ctxt.item || ctxt.context, ctxt) ) ) ;
		};
	}