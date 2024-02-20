function updateOrPushBundleFileTextLike(pos, end, kind) {
                const last2 = lastOrUndefined(bundleFileInfo.sections);
                if (last2 && last2.kind === kind) {
                    last2.end = end;
                }
                else {
                    bundleFileInfo.sections.push({ pos, end, kind });
                }
            }