function checkJsxPreconditions(errorNode) {
                if ((compilerOptions.jsx || 0 /* None */) === 0 /* None */) {
                    error(errorNode, Diagnostics.Cannot_use_JSX_unless_the_jsx_flag_is_provided);
                }
                if (getJsxElementTypeAt(errorNode) === void 0) {
                    if (noImplicitAny) {
                        error(errorNode, Diagnostics.JSX_element_implicitly_has_type_any_because_the_global_type_JSX_Element_does_not_exist);
                    }
                }
            }