function findLabelsToCreate(requiredLabels, repoLabels) {
                // Filter the labels we need, by the ones that already exist in the repo.
                // Return any that do not exist in the repo.
                return requiredLabels.filter(function (label) {
                    // If the label doesn't exist in the repo already, keep it.
                    return !(containsLabel(label, repoLabels));
                });
            }