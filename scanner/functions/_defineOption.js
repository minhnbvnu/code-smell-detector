function _defineOption(name, newName) {
    if (name !== 'pass') {
        Object.defineProperty(StandardMaterialOptions.prototype, name, {
            get: function () {
                Debug.deprecated(`Getting pc.Options#${name} has been deprecated as the property has been moved to pc.Options.LitShaderOptions#${newName || name}.`);
                return this.litOptions[newName || name];
            },
            set: function (value) {
                Debug.deprecated(`Setting pc.Options#${name} has been deprecated as the property has been moved to pc.Options.LitShaderOptions#${newName || name}.`);
                this.litOptions[newName || name] = value;
            }
        });
    }
}