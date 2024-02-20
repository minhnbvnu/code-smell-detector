function isSwagger2(jsSpec) {
            var swaggerVersion = jsSpec.get("swagger");
            if (typeof swaggerVersion !== "string") {
                return false
            }
            return swaggerVersion.startsWith("2.0")
        }