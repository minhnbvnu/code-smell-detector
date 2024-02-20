function addMatchers() {
	beforeEach(function() {
		this.addMatchers({
			toBeTiProxy: function() {
				return _.isFunction(this.actual.addEventListener);
			},
			toBeController: function() {
				return this.actual.__iamalloy === true;
			},
			toBeWidget: function() {
				return this.actual.__iamalloy === true;
			},
			toContainSameAs: function(array) {
				var actual = this.actual;
				this.message = function() {
					return 'expected ' + sortAndStringify(actual) + ' to contain ' +
						'same elements as ' + sortAndStringify(array);
				};

				return sortAndStringify(actual) === sortAndStringify(array);
			},
			toHaveStyle: function(style) {
				var component = this.actual;
				var obj = {};
				_.each(style, function(v,k) {
					obj[k] = component[k];
				});

				this.message = function() {
					return 'expected ' + this.actual.toString() + ' to have style:\n' +
						sortAndStringify(style) + '\nbut found this instead:\n' +
						sortAndStringify(obj);
				};

				return sortAndStringify(obj) === sortAndStringify(style);
			},
			toHaveFunction: function(func) {
				return _.isFunction(this.actual[func]);
			},
            toBeFile: function() {
                var file = _.isString(this.actual) ? Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, this.actual) : this.actual;
                return file.exists() && file.isFile();
            }
		});
	});
}