function warnBehaviorFeaturesDeprecation() {
    var featureNames = [], unregisteredFeatures = [], n = 0;

    this.features.forEach(function(FeatureConstructor) {
        var className = FeatureConstructor.prototype.$$CLASS_NAME || FeatureConstructor.name,
            featureName = className || 'feature' + n++;

        // build list of feature names
        featureNames.push(featureName);

        // build list of unregistered features
        if (!this.featureRegistry.get(featureName, true)) {
            var constructorName = FeatureConstructor.name || FeatureConstructor.prototype.$$CLASS_NAME || 'FeatureConstructor' + n,
                params = [];
            if (!className) {
                params.push('\'' + featureName + '\'');
            }
            params.push(constructorName);
            unregisteredFeatures.push(params.join(', '));
        }
    }, this);

    if (featureNames.length) {
        var sampleCode = 'Hypergrid.defaults.features = [\n' + join('\t\'', featureNames, '\',\n') + '];';

        if (unregisteredFeatures.length) {
            sampleCode += '\n\nThe following custom features are unregistered and will need to be registered prior to behavior instantiation:\n\n' +
                join('Features.add(', unregisteredFeatures, ');\n');
        }

        if (n) {
            sampleCode += '\n\n(You should provide meaningful names for your custom features rather than the generated names above.)';
        }

        console.warn('`grid.behavior.features` (array of feature constructors) has been deprecated as of version 2.1.0 in favor of `grid.properties.features` (array of feature names). Remove `features` array from your behavior and add `features` property to your grid state object (or Hypergrid.defaults), e.g.:\n\n' + sampleCode);
    }
}