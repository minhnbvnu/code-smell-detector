function parseFunctionType(){var o,s,C,_,U,$=w-z.length;return V.assert(B===u.NAME&&"function"===z,"FunctionType should start with 'function'"),consume(u.NAME),expect(u.LPAREN),o=!1,C=[],s=null,B!==u.RPAREN&&(B!==u.NAME||"this"!==z&&"new"!==z?C=parseParametersType():(o="new"===z,consume(u.NAME),expect(u.COLON),s=parseTypeName(),B===u.COMMA&&(consume(u.COMMA),C=parseParametersType()))),expect(u.RPAREN),_=null,B===u.COLON&&(consume(u.COLON,"ResultType should start with :"),_=B===u.NAME&&"void"===z?(consume(u.NAME),{type:i.VoidLiteral}):parseTypeExpression()),U=maybeAddRange({type:i.FunctionType,params:C,result:_},[$,P]),s&&(U.this=s,o&&(U.new=!0)),U}