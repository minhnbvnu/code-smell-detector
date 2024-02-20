function checkJsxFragment(node) {
                checkJsxOpeningLikeElementOrOpeningFragment(node.openingFragment);
                const nodeSourceFile = getSourceFileOfNode(node);
                if (getJSXTransformEnabled(compilerOptions) && (compilerOptions.jsxFactory || nodeSourceFile.pragmas.has("jsx")) && !compilerOptions.jsxFragmentFactory && !nodeSourceFile.pragmas.has("jsxfrag")) {
                    error(node, compilerOptions.jsxFactory ? Diagnostics.The_jsxFragmentFactory_compiler_option_must_be_provided_to_use_JSX_fragments_with_the_jsxFactory_compiler_option : Diagnostics.An_jsxFrag_pragma_is_required_when_using_an_jsx_pragma_with_JSX_fragments);
                }
                checkJsxChildren(node);
                return getJsxElementTypeAt(node) || anyType;
            }