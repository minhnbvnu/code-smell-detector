function pushModule(source, key, specifiers) {
	            var module = void 0;
	            modules.forEach(function (m) {
	              if (m.key === source) {
	                module = m;
	              }
	            });
	            if (!module) {
	              modules.push(module = { key: source, imports: [], exports: [] });
	            }
	            module[key] = module[key].concat(specifiers);
	          }