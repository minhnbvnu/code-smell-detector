function parseAlloyComponent(view, dir, manifest, noView, fileRestriction) {
	var parseType = noView ? 'controller' : 'view';
	fileRestriction = fileRestriction || null;

	// validate parameters
	if (!view) { U.die('Undefined ' + parseType + ' passed to parseAlloyComponent()'); }
	if (!dir) { U.die('Failed to parse ' + parseType + ' "' + view + '", no directory given'); }

	var dirRegex = new RegExp('^(?:' + CONST.PLATFORM_FOLDERS_ALLOY.join('|') + ')[\\\\\\/]*');
	var basename = path.basename(view, '.' + CONST.FILE_EXT[parseType.toUpperCase()]),
		dirname = path.dirname(view).replace(dirRegex, ''),
		viewName = basename,
		template = {
			viewCode: '',
			modelVariable: CONST.BIND_MODEL_VAR,
			parentVariable: CONST.PARENT_SYMBOL_VAR,
			itemTemplateVariable: CONST.ITEM_TEMPLATE_VAR,
			controllerPath: (dirname ? path.join(dirname, viewName) : viewName).replace(/\\/g, '/'),
			preCode: '',
			postCode: '',
			Widget: !manifest ? '' : 'var ' + CONST.WIDGET_OBJECT +
				" = new (require('/alloy/widget'))('" + manifest.id + "');this.__widgetId='" +
				manifest.id + "';",
			WPATH: !manifest ? '' : _.template(fs.readFileSync(path.join(alloyRoot, 'template', 'wpath.js'), 'utf8'))({ WIDGETID: manifest.id }),
			__MAPMARKER_CONTROLLER_CODE__: '',
			ES6Mod: ''
		},
		widgetDir = dirname ? path.join(CONST.DIR.COMPONENT, dirname) : CONST.DIR.COMPONENT,
		widgetStyleDir = dirname ? path.join(CONST.DIR.RUNTIME_STYLE, dirname) :
			CONST.DIR.RUNTIME_STYLE,
		state = { parent: {}, styles: [] },
		files = {};

	// reset the bindings map
	styler.bindingsMap = {};
	CU.destroyCode = '';
	CU.postCode = '';
	CU[CONST.AUTOSTYLE_PROPERTY] = compileConfig[CONST.AUTOSTYLE_PROPERTY];
	CU.currentManifest = manifest;
	CU.currentDefaultId = viewName;

	// create a list of file paths
	var searchPaths = noView ? ['CONTROLLER'] : ['VIEW', 'STYLE', 'CONTROLLER'];
	_.each(searchPaths, function(fileType) {
		// get the path values for the file
		var fileTypeRoot = path.join(dir, CONST.DIR[fileType]);
		var filename = viewName + '.' + CONST.FILE_EXT[fileType];
		var filepath = dirname ? path.join(dirname, filename) : filename;

		// check for platform-specific versions of the file
		var baseFile = path.join(fileTypeRoot, filepath);
		if (buildPlatform) {
			var platformSpecificFile = path.join(fileTypeRoot, buildPlatform, filepath);
			if (fs.existsSync(platformSpecificFile)) {
				if (fileType === 'STYLE') {
					files[fileType] = [
						{ file:baseFile },
						{ file:platformSpecificFile, platform:true }
					];
				} else {
					files[fileType] = platformSpecificFile;
				}
				return;
			}
		}
		files[fileType] = baseFile;
	});

	if (fileRestriction !== null && !matchesRestriction(files, fileRestriction)) {
		logger.info('  Not matching the file restriction, skipping');
		return;
	}

	_.each(['COMPONENT', 'RUNTIME_STYLE'], function(fileType) {
		files[fileType] = path.join(compileConfig.dir.resources, 'alloy', CONST.DIR[fileType]);
		if (dirname) { files[fileType] = path.join(files[fileType], dirname); }
		files[fileType] = path.join(files[fileType], viewName + '.js');
	});

	// we are processing a view, not just a controller
	if (!noView) {
		// validate view
		if (!fs.existsSync(files.VIEW)) {
			logger.warn('No ' + CONST.FILE_EXT.VIEW + ' view file found for view ' + files.VIEW);
			return;
		}

		// load global style, if present
		state.styles = styler.globalStyle || [];

		// Load the style and update the state
		if (files.STYLE) {
			var theStyles = _.isArray(files.STYLE) ? files.STYLE : [{file:files.STYLE}];
			_.each(theStyles, function(style) {
				if (fs.existsSync(style.file)) {
					logger.info('  style:      "' +
						path.relative(path.join(dir, CONST.DIR.STYLE), style.file) + '"');
					state.styles = styler.loadAndSortStyle(style.file, {
						existingStyle: state.styles,
						platform: style.platform
					});
				}
			});
		}

		if (theme) {
			// if a theme is applied, override TSS definitions with those defined in the theme
			var themeStylesDir, theStyle, themeStylesFile, psThemeStylesFile;
			if (!manifest) {
				// theming a "normal" controller
				themeStylesDir = path.join(compileConfig.dir.themes, theme, 'styles');
				theStyle = dirname ? path.join(dirname, viewName + '.tss') : viewName + '.tss';
				themeStylesFile = path.join(themeStylesDir, theStyle);
				psThemeStylesFile = path.join(themeStylesDir, buildPlatform, theStyle);
			} else {
				// theming a widget
				themeStylesDir = path.join(compileConfig.dir.themes, theme, 'widgets', manifest.id, 'styles');
				theStyle = dirname ? path.join(dirname, viewName + '.tss') : viewName + '.tss';
				themeStylesFile = path.join(themeStylesDir, theStyle);
				psThemeStylesFile = path.join(themeStylesDir, buildPlatform, theStyle);
			}

			if (fs.existsSync(themeStylesFile)) {
				// load theme-specific styles, overriding default definitions
				logger.info('  theme:      "' + path.join(theme.toUpperCase(), theStyle) + '"');
				state.styles = styler.loadAndSortStyle(themeStylesFile, {
					existingStyle: state.styles,
					theme: true
				});
			}
			if (fs.existsSync(psThemeStylesFile)) {
				// load theme- and platform-specific styles, overriding default definitions
				logger.info('  theme:      "' +
					path.join(theme.toUpperCase(), buildPlatform, theStyle) + '"');
				state.styles = styler.loadAndSortStyle(psThemeStylesFile, {
					existingStyle: state.styles,
					platform: true,
					theme: true
				});
			}
		}

		// Load view from file into an XML document root node
		var docRoot;
		try {
			logger.info('  view:       "' +
				path.relative(path.join(dir, CONST.DIR.VIEW), files.VIEW) + '"');
			docRoot = U.XML.getAlloyFromFile(files.VIEW);
		} catch (e) {
			U.die([
				e.stack,
				'Error parsing XML for view "' + view + '"'
			]);
		}

		// see if autoStyle is enabled for the view
		if (docRoot.hasAttribute(CONST.AUTOSTYLE_PROPERTY)) {
			CU[CONST.AUTOSTYLE_PROPERTY] =
				docRoot.getAttribute(CONST.AUTOSTYLE_PROPERTY) === 'true';
		}

		// see if module attribute has been set on the docRoot (<Alloy>) tag for the view
		if (docRoot.hasAttribute(CONST.DOCROOT_MODULE_PROPERTY)) {
			CU[CONST.DOCROOT_MODULE_PROPERTY] = docRoot.getAttribute(CONST.DOCROOT_MODULE_PROPERTY);
		} else {
			CU[CONST.DOCROOT_MODULE_PROPERTY] = null;
		}

		// see if baseController attribute has been set on the docRoot (<Alloy>) tag for the view
		if (docRoot.hasAttribute(CONST.DOCROOT_BASECONTROLLER_PROPERTY)) {
			CU[CONST.DOCROOT_BASECONTROLLER_PROPERTY] = '"' + docRoot.getAttribute(CONST.DOCROOT_BASECONTROLLER_PROPERTY) + '"';
		} else {
			CU[CONST.DOCROOT_BASECONTROLLER_PROPERTY] = null;
		}

		// make sure we have a Window, TabGroup, or SplitWindow
		var rootChildren = U.XML.getElementsFromNodes(docRoot.childNodes);
		if (viewName === 'index' && !dirname) {
			var valid = [
				'Ti.UI.Window',
				'Ti.UI.iOS.SplitWindow',
				'Ti.UI.TabGroup',
				'Ti.UI.iOS.NavigationWindow',
				'Ti.UI.NavigationWindow'
			].concat(CONST.MODEL_ELEMENTS);
			_.each(rootChildren, function(node) {
				var found = true;
				var args = CU.getParserArgs(node, {}, { doSetId: false });

				if (args.fullname === 'Alloy.Require') {
					var inspect = CU.inspectRequireNode(node);
					for (var j = 0; j < inspect.names.length; j++) {
						if (!_.includes(valid, inspect.names[j])) {
							found = false;
							break;
						}
					}
				} else {
					found = _.includes(valid, args.fullname);
				}

				if (!found) {
					U.die([
						'Compile failed. index.xml must have a top-level container element.',
						'Valid elements: [' + valid.join(',') + ']'
					]);
				}
			});
		}

		// process any model/collection nodes
		_.each(rootChildren, function(node, i) {
			var fullname = CU.getNodeFullname(node);
			var isModelElement = _.includes(CONST.MODEL_ELEMENTS, fullname);

			if (isModelElement) {
				var vCode = CU.generateNode(node, state, undefined, false, true);
				template.viewCode += vCode.content;
				template.preCode += vCode.pre;

				// remove the model/collection nodes when done
				docRoot.removeChild(node);
			}
		});

		// rebuild the children list since model elements have been removed
		rootChildren = U.XML.getElementsFromNodes(docRoot.childNodes);

		// process the UI nodes
		_.each(rootChildren, function(node, i) {
			// should we use the default id?
			var defaultId = CU.isNodeForCurrentPlatform(node) ? viewName : undefined;

			// generate the code for this node
			var fullname = CU.getNodeFullname(node);
			template.viewCode += CU.generateNode(node, {
				parent:{},
				styles:state.styles,
				widgetId: manifest ? manifest.id : undefined,
				parentFormFactor: node.hasAttribute('formFactor') ? node.getAttribute('formFactor') : undefined
			}, defaultId, true);
		});
	}

	// process the controller code
	if (fs.existsSync(files.CONTROLLER)) {
		logger.info('  controller: "' +
			path.relative(path.join(dir, CONST.DIR.CONTROLLER), files.CONTROLLER) + '"');
	}
	var cCode = CU.loadController(files.CONTROLLER);
	template.parentController = (cCode.parentControllerName !== '') ?
		cCode.parentControllerName : CU[CONST.DOCROOT_BASECONTROLLER_PROPERTY] || "'BaseController'";
	template.__MAPMARKER_CONTROLLER_CODE__ += cCode.controller;
	template.preCode += cCode.pre;
	template.ES6Mod += cCode.es6mods;

	// for each model variable in the bindings map...
	_.each(styler.bindingsMap, function(mapping, modelVar) {

		// open the model binding handler
		var handlerVar = CU.generateUniqueId();
		template.viewCode += 'var ' + handlerVar + ' = function() {';

		_.each(mapping.models, function(modelVar) {
			template.viewCode += modelVar + '.__transform = _.isFunction(' + modelVar + '.transform) ? ' + modelVar + '.transform() : ' + modelVar + '.toJSON();';
		});

		CU.destroyCode += modelVar + ' && ' + ((state.parentFormFactor) ? 'is' + U.ucfirst(state.parentFormFactor) : '' ) +
			modelVar + ".off('" + CONST.MODEL_BINDING_EVENTS + "'," + handlerVar + ');';

		// for each specific conditional within the bindings map....
		_.each(_.groupBy(mapping.bindings, function(b) {return b.condition;}), function(bindings, condition) {
			var bCode = '';

			// for each binding belonging to this model/conditional pair...
			_.each(bindings, function(binding) {
				bCode += '$.' + binding.id + '.' + binding.prop + ' = ' + binding.val + ';';
			});

			// if this is a legit conditional, wrap the binding code in it
			if (typeof condition !== 'undefined' && condition !== 'undefined') {
				bCode = 'if(' + condition + '){' + bCode + '}';
			}
			template.viewCode += bCode;

		});
		template.viewCode += '};';
		template.viewCode += modelVar + ".on('" + CONST.MODEL_BINDING_EVENTS + "'," +
			handlerVar + ');';
	});

	// add destroy() function to view for cleaning up bindings
	template.viewCode += 'exports.destroy = function () {' + CU.destroyCode + '};';

	// add dataFunction of original name (if data-binding with form factor has been used)
	if (!_.isEmpty(CU.dataFunctionNames)) {
		_.each(Object.keys(CU.dataFunctionNames), function(funcName) {
			template.viewCode += 'function ' + funcName + '() { ';
			_.each(CU.dataFunctionNames[funcName], function(formFactor) {
				template.viewCode += '	if(Alloy.is' + U.ucfirst(formFactor) + ') { ' + funcName + U.ucfirst(formFactor) + '(); } ';
			});
			template.viewCode += '}';
		});
	}

	// add any postCode after the controller code
	template.postCode += CU.postCode;

	// create generated controller module code for this view/controller or widget
	var controllerCode = template.__MAPMARKER_CONTROLLER_CODE__;
	delete template.__MAPMARKER_CONTROLLER_CODE__;
	var code = _.template(fs.readFileSync(path.join(compileConfig.dir.template, 'component.js'), 'utf8'))(template);

	// prep the controller paths based on whether it's an app
	// controller or widget controller
	var targetFilepath = path.join(compileConfig.dir.resources, titaniumFolder,
		path.relative(compileConfig.dir.resources, files.COMPONENT));
	var runtimeStylePath = path.join(compileConfig.dir.resources, titaniumFolder,
		path.relative(compileConfig.dir.resources, files.RUNTIME_STYLE));
	if (manifest) {
		fs.mkdirpSync(
			path.join(compileConfig.dir.resources, titaniumFolder, 'alloy', CONST.DIR.WIDGET,
				manifest.id, widgetDir)
		);
		fs.mkdirpSync(
			path.join(compileConfig.dir.resources, titaniumFolder, 'alloy', CONST.DIR.WIDGET,
				manifest.id, widgetStyleDir)
		);

		// [ALOY-967] merge "i18n" dir in widget folder
		CU.mergeI18N(path.join(dir, 'i18n'), path.join(compileConfig.dir.project, 'i18n'), { override: false });
		widgetIds.push(manifest.id);

		CU.copyWidgetResources(
			[path.join(dir, CONST.DIR.ASSETS), path.join(dir, CONST.DIR.LIB)],
			path.join(compileConfig.dir.resources, titaniumFolder),
			manifest.id,
			{
				filter: new RegExp('^(?:' + otherPlatforms.join('|') + ')[\\/\\\\]'),
				exceptions: otherPlatforms,
				titaniumFolder: titaniumFolder,
				theme: theme
			}
		);
		targetFilepath = path.join(
			compileConfig.dir.resources, titaniumFolder, 'alloy', CONST.DIR.WIDGET, manifest.id,
			widgetDir, viewName + '.js'
		);
		runtimeStylePath = path.join(
			compileConfig.dir.resources, titaniumFolder, 'alloy', CONST.DIR.WIDGET, manifest.id,
			widgetStyleDir, viewName + '.js'
		);
	}

	// generate the code and source map for the current controller
	sourceMapper.generateCodeAndSourceMap({
		target: {
			filename: path.relative(compileConfig.dir.project, files.COMPONENT),
			filepath: targetFilepath,
			templateContent: code
		},
		data: {
			__MAPMARKER_CONTROLLER_CODE__: {
				filename: path.relative(compileConfig.dir.project, files.CONTROLLER),
				fileContent: controllerCode
			}
		}
	}, compileConfig);

	// initiate runtime style module creation
	var relativeStylePath = path.relative(compileConfig.dir.project, runtimeStylePath);
	logger.info('  created:     "' + relativeStylePath + '"');

	// skip optimize process, as the file is an alloy component
	restrictionSkipOptimize = (fileRestriction !== null);

	// pre-process runtime controllers to save runtime performance
	var STYLE_PLACEHOLDER = '__STYLE_PLACEHOLDER__';
	var STYLE_REGEX = new RegExp('[\'"]' + STYLE_PLACEHOLDER + '[\'"]');
	var processedStyles = [];
	_.each(state.styles, function(s) {
		var o = {};

		// make sure this style entry applies to the current platform
		if (s && s.queries && s.queries.platform &&
			!_.includes(s.queries.platform, buildPlatform)) {
			return;
		}

		// get the runtime processed version of the JSON-safe style
		var processed = '{' + styler.processStyle(s.style, state) + '}';

		// create a temporary style object, sans style key
		_.each(s, function(v, k) {
			if (k === 'queries') {
				var queriesObj = {};

				// optimize style conditionals for runtime
				_.each(s[k], function(query, queryKey) {
					if (queryKey === 'platform') {
						// do nothing, we don't need the platform key anymore
					} else if (queryKey === 'formFactor') {
						queriesObj[queryKey] = 'is' + U.ucfirst(query);
					} else if (queryKey === 'if') {
						queriesObj[queryKey] =  query;
					} else {
						logger.warn('Unknown device query "' + queryKey + '"');
					}
				});

				// add the queries object, if not empty
				if (!_.isEmpty(queriesObj)) {
					o[k] = queriesObj;
				}
			} else if (k !== 'style') {
				o[k] = v;
			}
		});

		// Create a full processed style string by inserting the processed style
		// into the JSON stringifed temporary style object
		o.style = STYLE_PLACEHOLDER;
		processedStyles.push(JSON.stringify(o).replace(STYLE_REGEX, processed));
	});

	// write out the pre-processed styles to runtime module files
	var styleCode = 'module.exports = [' + processedStyles.join(',') + '];';
	if (manifest) {
		styleCode += _.template(fs.readFileSync(path.join(alloyRoot, 'template', 'wpath.js'), 'utf8'))({ WIDGETID: manifest.id });
	}
	fs.mkdirpSync(path.dirname(runtimeStylePath));
	fs.writeFileSync(runtimeStylePath, styleCode);
}