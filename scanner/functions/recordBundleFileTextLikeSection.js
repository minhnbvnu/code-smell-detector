function recordBundleFileTextLikeSection(end) {
                if (sourceFileTextPos < end) {
                    updateOrPushBundleFileTextLike(sourceFileTextPos, end, sourceFileTextKind);
                    return true;
                }
                return false;
            }