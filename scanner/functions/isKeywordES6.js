function isKeywordES6(id, strict) {
	        if (strict && isStrictModeReservedWordES6(id)) {
	            return true;
	        }

	        switch (id.length) {
	            case 2:
	                return id === 'if' || id === 'in' || id === 'do';
	            case 3:
	                return id === 'var' || id === 'for' || id === 'new' || id === 'try';
	            case 4:
	                return id === 'this' || id === 'else' || id === 'case' || id === 'void' || id === 'with' || id === 'enum';
	            case 5:
	                return id === 'while' || id === 'break' || id === 'catch' || id === 'throw' || id === 'const' || id === 'yield' || id === 'class' || id === 'super';
	            case 6:
	                return id === 'return' || id === 'typeof' || id === 'delete' || id === 'switch' || id === 'export' || id === 'import';
	            case 7:
	                return id === 'default' || id === 'finally' || id === 'extends';
	            case 8:
	                return id === 'function' || id === 'continue' || id === 'debugger';
	            case 10:
	                return id === 'instanceof';
	            default:
	                return false;
	        }
	    }