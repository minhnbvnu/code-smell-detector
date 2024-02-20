function wrapCustomTransformerFactory(transformer, handleDefault) {
            return (context) => {
                const customTransformer = transformer(context);
                return typeof customTransformer === "function" ? handleDefault(context, customTransformer) : wrapCustomTransformer(customTransformer);
            };
        }