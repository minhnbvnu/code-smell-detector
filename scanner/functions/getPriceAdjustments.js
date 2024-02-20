function getPriceAdjustments(properties, handlers) {
    if(properties) {
        return properties.reduce((acc, prop) => {
            if (
                handlers[prop.type] &&
                handlers[prop.type].priceHandler &&
                prop.config &&
                prop.config.pricing &&
                prop.config.pricing.operation
            ) {
                const adjuster = handlers[prop.type].priceHandler;
                let valToPUsh = {
                    name: prop.name,
                    type: prop.type,
                    operation: prop.config.pricing.operation,
                    value: adjuster(prop.data, prop.config) || 0
                }
                acc.push(valToPUsh);

            }
            return acc;
        }, [])
    }else{
        return [];
    }
}