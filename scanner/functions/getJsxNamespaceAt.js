function getJsxNamespaceAt(location) {
                const links = location && getNodeLinks(location);
                if (links && links.jsxNamespace) {
                    return links.jsxNamespace;
                }
                if (!links || links.jsxNamespace !== false) {
                    let resolvedNamespace = getJsxNamespaceContainerForImplicitImport(location);
                    if (!resolvedNamespace || resolvedNamespace === unknownSymbol) {
                        const namespaceName = getJsxNamespace(location);
                        resolvedNamespace = resolveName(location, namespaceName, 1920 /* Namespace */, 
                        /*diagnosticMessage*/
                        void 0, namespaceName, 
                        /*isUse*/
                        false);
                    }
                    if (resolvedNamespace) {
                        const candidate = resolveSymbol(getSymbol2(getExportsOfSymbol(resolveSymbol(resolvedNamespace)), JsxNames.JSX, 1920 /* Namespace */));
                        if (candidate && candidate !== unknownSymbol) {
                            if (links) {
                                links.jsxNamespace = candidate;
                            }
                            return candidate;
                        }
                    }
                    if (links) {
                        links.jsxNamespace = false;
                    }
                }
                const s = resolveSymbol(getGlobalSymbol(JsxNames.JSX, 1920 /* Namespace */, 
                /*diagnosticMessage*/
                void 0));
                if (s === unknownSymbol) {
                    return void 0;
                }
                return s;
            }