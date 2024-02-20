function checkExternalEmitHelpers(location, helpers) {
                if ((requestedExternalEmitHelpers & helpers) !== helpers && compilerOptions.importHelpers) {
                    const sourceFile = getSourceFileOfNode(location);
                    if (isEffectiveExternalModule(sourceFile, compilerOptions) && !(location.flags & 16777216 /* Ambient */)) {
                        const helpersModule = resolveHelpersModule(sourceFile, location);
                        if (helpersModule !== unknownSymbol) {
                            const uncheckedHelpers = helpers & ~requestedExternalEmitHelpers;
                            for (let helper = 1 /* FirstEmitHelper */; helper <= 16777216 /* LastEmitHelper */; helper <<= 1) {
                                if (uncheckedHelpers & helper) {
                                    for (const name of getHelperNames(helper)) {
                                        if (requestedExternalEmitHelperNames.has(name))
                                            continue;
                                        requestedExternalEmitHelperNames.add(name);
                                        const symbol = getSymbol2(helpersModule.exports, escapeLeadingUnderscores(name), 111551 /* Value */);
                                        if (!symbol) {
                                            error(location, Diagnostics.This_syntax_requires_an_imported_helper_named_1_which_does_not_exist_in_0_Consider_upgrading_your_version_of_0, externalHelpersModuleNameText, name);
                                        }
                                        else if (helper & 524288 /* ClassPrivateFieldGet */) {
                                            if (!some(getSignaturesOfSymbol(symbol), (signature) => getParameterCount(signature) > 3)) {
                                                error(location, Diagnostics.This_syntax_requires_an_imported_helper_named_1_with_2_parameters_which_is_not_compatible_with_the_one_in_0_Consider_upgrading_your_version_of_0, externalHelpersModuleNameText, name, 4);
                                            }
                                        }
                                        else if (helper & 1048576 /* ClassPrivateFieldSet */) {
                                            if (!some(getSignaturesOfSymbol(symbol), (signature) => getParameterCount(signature) > 4)) {
                                                error(location, Diagnostics.This_syntax_requires_an_imported_helper_named_1_with_2_parameters_which_is_not_compatible_with_the_one_in_0_Consider_upgrading_your_version_of_0, externalHelpersModuleNameText, name, 5);
                                            }
                                        }
                                        else if (helper & 1024 /* SpreadArray */) {
                                            if (!some(getSignaturesOfSymbol(symbol), (signature) => getParameterCount(signature) > 2)) {
                                                error(location, Diagnostics.This_syntax_requires_an_imported_helper_named_1_with_2_parameters_which_is_not_compatible_with_the_one_in_0_Consider_upgrading_your_version_of_0, externalHelpersModuleNameText, name, 3);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        requestedExternalEmitHelpers |= helpers;
                    }
                }
            }