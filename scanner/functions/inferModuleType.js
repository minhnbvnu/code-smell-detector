function inferModuleType(initExpression) {
                if (initExpression.type === "MemberExpression") {
                    // "var x = require('glob').Glob;"
                    return inferModuleType(initExpression.object);
                }
                if (initExpression.arguments.length === 0) {
                    // "var x = require();"
                    return REQ_COMPUTED;
                }
                const arg = initExpression.arguments[0];
                if (arg.type !== "Literal" || typeof arg.value !== "string") {
                    // "var x = require(42);"
                    return REQ_COMPUTED;
                }
                if (BUILTIN_MODULES.includes(arg.value)) {
                    // "var fs = require('fs');"
                    return REQ_CORE;
                }
                if (/^\.{0,2}\//u.test(arg.value)) {
                    // "var utils = require('./utils');"
                    return REQ_FILE;
                }
                // "var async = require('async');"
                return REQ_MODULE;
            }