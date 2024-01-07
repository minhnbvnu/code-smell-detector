function BinopTokenType(name, prec) {
	    classCallCheck(this, BinopTokenType);
	    return possibleConstructorReturn(this, _TokenType2.call(this, name, { beforeExpr: beforeExpr, binop: prec }));
	  }