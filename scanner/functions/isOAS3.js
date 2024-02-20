function isOAS3(jsSpec) {
            var oasVersion = jsSpec.get("openapi");
            if (typeof oasVersion !== "string") {
                return false
            }
            return oasVersion.startsWith("3.0.") && oasVersion.length > 4
        }