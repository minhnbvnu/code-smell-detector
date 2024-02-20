function getNameCandidateWorker(symbol, localName) {
                        if (localName === "default" /* Default */ || localName === "__class" /* Class */ || localName === "__function" /* Function */) {
                            const flags = context.flags;
                            context.flags |= 16777216 /* InInitialEntityName */;
                            const nameCandidate = getNameOfSymbolAsWritten(symbol, context);
                            context.flags = flags;
                            localName = nameCandidate.length > 0 && isSingleOrDoubleQuote(nameCandidate.charCodeAt(0)) ? stripQuotes(nameCandidate) : nameCandidate;
                        }
                        if (localName === "default" /* Default */) {
                            localName = "_default";
                        }
                        else if (localName === "export=" /* ExportEquals */) {
                            localName = "_exports";
                        }
                        localName = isIdentifierText(localName, languageVersion) && !isStringANonContextualKeyword(localName) ? localName : "_" + localName.replace(/[^a-zA-Z0-9]/g, "_");
                        return localName;
                    }