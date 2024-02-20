async function buildSwagger(model) {
    let schema = await model.getSchema(true, true);
    console.log(schema);
    return Object.entries(schema).reduce((acc, [key, value]) => {
        let property = {};
        console.log(key);
        if (key === "references") {
            let entries = Object.entries(value);
            if (entries.length === 0) {
                return acc;
            }
            acc.properties["references"] = entries.reduce((refAcc, [refKey, refValue]) => {
                refAcc.properties[refKey] = {
                    "type": "array",
                    "items": [
                        {"$ref": "#/definitions/" + refKey}
                    ]
                };
                return refAcc;
            }, {type: "object", properties: {}});
            return acc;
        }
        if (!value.nullable && value.defaultValue === null) {
            if (!acc.required) {
                acc.required = [];
            }
            acc.required.push(key);
        }

        let type = value.type;
        if (key === "password") {
            property.format = "password";
        }
        if (value.maxLength) {
            property.maxLength = value.maxLength
        }
        switch (type) {
            case "character varying":
            case "timestamp with time zone":
            case "text":
                type = "string";
                break;
            case "real":
                type = "number";
                property.format = "float";
                break;
            case "bigint":
                type = "integer";
                property.format = "int64";
                break;
            case "jsonb":
                type = "object";
                break;
            case "ARRAY":
                type = "array";
                property.items = {type: "string", format: "email"};
                break;
            default:
                break;

        }
        property.type = type;
        acc.properties[key] = property;
        console.log(property);
        return acc;

    }, {type: "object", properties: {}})
}