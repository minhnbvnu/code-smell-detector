function EvaluatorPreprocessor(t,r){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:new V;_classCallCheck(this,EvaluatorPreprocessor);this.parser=new S.Parser({lexer:new S.Lexer(t,EvaluatorPreprocessor.opMap),xref:r});this.stateManager=o;this.nonProcessedArgs=[];this._isPathOp=!1;this._numInvalidPathOPS=0}