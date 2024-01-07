function powStrict_(base, exp) {
	  deprecationWarn('strict variants of ops have been deprecated ' + 'and will be removed in future');
	  assertShapesMatch(base.shape, exp.shape, 'Error in powStrict: ');
	  return pow$5(base, exp);
	}