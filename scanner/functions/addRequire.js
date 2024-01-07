function addRequire(source, blockHoist) {
	            var cached = requires[source];
	            if (cached) return cached;

	            var ref = path.scope.generateUidIdentifier((0, _path2.basename)(source, (0, _path2.extname)(source)));

	            var varDecl = t.variableDeclaration("var", [t.variableDeclarator(ref, buildRequire(t.stringLiteral(source)).expression)]);

	            if (imports[source]) {
	              varDecl.loc = imports[source].loc;
	            }

	            if (typeof blockHoist === "number" && blockHoist > 0) {
	              varDecl._blockHoist = blockHoist;
	            }

	            topNodes.push(varDecl);

	            return requires[source] = ref;
	          }