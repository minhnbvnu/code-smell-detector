function _isJscexPattern(ast) {
            if (ast[0] != "call") return false;
            
            var evalName = ast[1];
            if (evalName[0] != "name" || evalName[1] != "eval") return false;

            var compileCall = ast[2][0];
            if (!compileCall || compileCall[0] != "call") return false;

            var compileMethod = compileCall[1];
            if (!compileMethod || compileMethod[0] != "dot" || compileMethod[2] != "compile") return false;

            var jscexName = compileMethod[1];
            if (!jscexName || jscexName[0] != "name" || jscexName[1] != "Jscex") return false;

            var builder = compileCall[2][0];
            if (!builder || builder[0] != "string") return false;

            var func = compileCall[2][1];
            if (!func || func[0] != "function") return false;

            return true;
        }