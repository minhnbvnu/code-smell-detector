function getDeclarationType(initExpression) {
                if (!initExpression) {
                    // "var x;"
                    return DECL_UNINITIALIZED;
                }
                if (initExpression.type === "CallExpression" &&
                    initExpression.callee.type === "Identifier" &&
                    initExpression.callee.name === "require") {
                    // "var x = require('util');"
                    return DECL_REQUIRE;
                }
                if (allowCall &&
                    initExpression.type === "CallExpression" &&
                    initExpression.callee.type === "CallExpression") {
                    // "var x = require('diagnose')('sub-module');"
                    return getDeclarationType(initExpression.callee);
                }
                if (initExpression.type === "MemberExpression") {
                    // "var x = require('glob').Glob;"
                    return getDeclarationType(initExpression.object);
                }
                // "var x = 42;"
                return DECL_OTHER;
            }