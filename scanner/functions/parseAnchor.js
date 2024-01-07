function parseAnchor() {
	      // Anchor ::
	      //      ^
	      //      $
	      //      \ b
	      //      \ B
	      //      ( ? = Disjunction )
	      //      ( ? ! Disjunction )
	      var res,
	          from = pos;

	      if (match('^')) {
	        return createAnchor('start', 1 /* rawLength */);
	      } else if (match('$')) {
	        return createAnchor('end', 1 /* rawLength */);
	      } else if (match('\\b')) {
	        return createAnchor('boundary', 2 /* rawLength */);
	      } else if (match('\\B')) {
	        return createAnchor('not-boundary', 2 /* rawLength */);
	      } else {
	        return parseGroup('(?=', 'lookahead', '(?!', 'negativeLookahead');
	      }
	    }