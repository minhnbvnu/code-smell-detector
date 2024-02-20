function _process(self, statement, bag, root) {
    var template, param, compiled;
    self.params = [];
    if(statement.uri) {
        try {
            // Look for '{' and '}
            compiled = strTemplate.parse(statement.uri);
            statement.uri = compiled.format(bag, true);
        }
        catch(e) {
            // Continue as we can treat non-templates as usual
        }
        // self
        self.uri = statement.uri;
        self.method = statement.method.toLowerCase();

        template = uriTemplate.parse(statement.uri);

        _.each(template.stream, function(token) {
            if(token && token.variable) {
                param = cloneDeep(token);
                // Don't worry - there is an intentional typo here
                param.defautl = statement.defaults ? statement.defaults[token.variable] : undefined;
                self.params.push(param);
            }
        });
    }
    if(statement.headers) {
        _.each(statement.headers, function(v, n) {
            try {
                var compiled = strTemplate.parse(v);

                // Keep non-matching tokens here so that they can be replaced at engine.exec time.
                statement.headers[n] = compiled.format(bag, true);
            }
            catch(e) {
                // Ignore as we want to treat non-conformat strings as opaque
            }
        });
    }
    if(statement.defaults) {
        _.each(statement.defaults, function(v, n) {
            try {
                var compiled = strTemplate.parse(v);

                // Keep non-matching tokens here so that they can be replaced at engine.exec time.
                statement.defaults[n] = compiled.format(bag, true);
            }
            catch(e) {
                // Ignore as we want to treat non-conformat strings as opaque
            }
        });
    }
    if(statement.body) {
        // Load the file
        statement.body.content = fs.readFileSync(normalize(root + statement.body.template), 'utf8');
        self.body = cloneDeep(statement.body);
    }
    if(statement.patch) {
        var path = root + statement.patch;

        // Monkey patch is the compiled patch module
        var patch = require(path);
        _.each(patch, function(v, k) {
            self[k] = v;
        });
    }
    if(statement.auth) {
        // auth is the compiled auth module
        try {
            self.auth = require(statement.auth);
        }
        catch(e) {
            // Not found in a module path. Try current dir
            path = root + statement.auth;
            self.auth = require(path);
        }
    }
}