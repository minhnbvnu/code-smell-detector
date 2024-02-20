function getJsxNamespaceContainerForImplicitImport(location) {
                const file = location && getSourceFileOfNode(location);
                const links = file && getNodeLinks(file);
                if (links && links.jsxImplicitImportContainer === false) {
                    return void 0;
                }
                if (links && links.jsxImplicitImportContainer) {
                    return links.jsxImplicitImportContainer;
                }
                const runtimeImportSpecifier = getJSXRuntimeImport(getJSXImplicitImportBase(compilerOptions, file), compilerOptions);
                if (!runtimeImportSpecifier) {
                    return void 0;
                }
                const isClassic = getEmitModuleResolutionKind(compilerOptions) === 1 /* Classic */;
                const errorMessage = isClassic ? Diagnostics.Cannot_find_module_0_Did_you_mean_to_set_the_moduleResolution_option_to_nodenext_or_to_add_aliases_to_the_paths_option : Diagnostics.Cannot_find_module_0_or_its_corresponding_type_declarations;
                const mod = resolveExternalModule(location, runtimeImportSpecifier, errorMessage, location);
                const result = mod && mod !== unknownSymbol ? getMergedSymbol(resolveSymbol(mod)) : void 0;
                if (links) {
                    links.jsxImplicitImportContainer = result || false;
                }
                return result;
            }