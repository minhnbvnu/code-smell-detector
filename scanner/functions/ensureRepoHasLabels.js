function ensureRepoHasLabels(repo, requiredLabels, repoLabels) {
                var toCreate = findLabelsToCreate(requiredLabels, repoLabels);

                toCreate.forEach(function (requiredLabel, index) {
                    // Repo doesn't have this label. Create it.
                    gh.issues.createLabel({
                        user: repo.user,
                        repo: repo.repo,
                        name: requiredLabel.name,
                        color: requiredLabel.color
                    }, noop);
                });
            }