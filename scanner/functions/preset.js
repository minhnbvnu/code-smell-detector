function preset(context) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var moduleTypes = ["commonjs", "amd", "umd", "systemjs"];
	  var loose = false;
	  var modules = "commonjs";
	  var spec = false;

	  if (opts !== undefined) {
	    if (opts.loose !== undefined) loose = opts.loose;
	    if (opts.modules !== undefined) modules = opts.modules;
	    if (opts.spec !== undefined) spec = opts.spec;
	  }

	  if (typeof loose !== "boolean") throw new Error("Preset es2015 'loose' option must be a boolean.");
	  if (typeof spec !== "boolean") throw new Error("Preset es2015 'spec' option must be a boolean.");
	  if (modules !== false && moduleTypes.indexOf(modules) === -1) {
	    throw new Error("Preset es2015 'modules' option must be 'false' to indicate no modules\n" + "or a module type which be be one of: 'commonjs' (default), 'amd', 'umd', 'systemjs'");
	  }

	  var optsLoose = { loose: loose };

	  return {
	    plugins: [[_babelPluginTransformEs2015TemplateLiterals2.default, { loose: loose, spec: spec }], _babelPluginTransformEs2015Literals2.default, _babelPluginTransformEs2015FunctionName2.default, [_babelPluginTransformEs2015ArrowFunctions2.default, { spec: spec }], _babelPluginTransformEs2015BlockScopedFunctions2.default, [_babelPluginTransformEs2015Classes2.default, optsLoose], _babelPluginTransformEs2015ObjectSuper2.default, _babelPluginTransformEs2015ShorthandProperties2.default, _babelPluginTransformEs2015DuplicateKeys2.default, [_babelPluginTransformEs2015ComputedProperties2.default, optsLoose], [_babelPluginTransformEs2015ForOf2.default, optsLoose], _babelPluginTransformEs2015StickyRegex2.default, _babelPluginTransformEs2015UnicodeRegex2.default, _babelPluginCheckEs2015Constants2.default, [_babelPluginTransformEs2015Spread2.default, optsLoose], _babelPluginTransformEs2015Parameters2.default, [_babelPluginTransformEs2015Destructuring2.default, optsLoose], _babelPluginTransformEs2015BlockScoping2.default, _babelPluginTransformEs2015TypeofSymbol2.default, modules === "commonjs" && [_babelPluginTransformEs2015ModulesCommonjs2.default, optsLoose], modules === "systemjs" && [_babelPluginTransformEs2015ModulesSystemjs2.default, optsLoose], modules === "amd" && [_babelPluginTransformEs2015ModulesAmd2.default, optsLoose], modules === "umd" && [_babelPluginTransformEs2015ModulesUmd2.default, optsLoose], [_babelPluginTransformRegenerator2.default, { async: false, asyncGenerators: false }]].filter(Boolean) };
	}