function removeUnwantedLabels(labelsToRemove, prLabels) {
                // Filter the pull request labels, only keeping the ones that are no in labelsToRemove
                return prLabels.filter(function (prLabel) {
                    return !(containsLabel(prLabel, labelsToRemove));
                });
            }