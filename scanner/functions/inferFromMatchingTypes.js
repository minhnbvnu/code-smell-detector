function inferFromMatchingTypes(sources, targets, matches) {
                    let matchedSources;
                    let matchedTargets;
                    for (const t of targets) {
                        for (const s of sources) {
                            if (matches(s, t)) {
                                inferFromTypes(s, t);
                                matchedSources = appendIfUnique(matchedSources, s);
                                matchedTargets = appendIfUnique(matchedTargets, t);
                            }
                        }
                    }
                    return [
                        matchedSources ? filter(sources, (t) => !contains(matchedSources, t)) : sources,
                        matchedTargets ? filter(targets, (t) => !contains(matchedTargets, t)) : targets
                    ];
                }