function getConstructorParametersObject() {
            let result = [ '{' ];

            result = result.concat(_.keys(this.config.properties).map(function(propName) {
                return '                ' + propName + ': ' + this.getModelToThreeGetter(propName) + ',';
            }, this));

            result.push('            }');
            return result;
        }