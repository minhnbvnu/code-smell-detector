function getStatusLabel(labelName) {
                var indexOfLabel = voteStatusLabels.map(function (label) {
                    return label.name;
                }).indexOf(labelName);

                if (indexOfLabel < 0) {
                    throw 'No status label with the name \'' + labelName + '\' was found.';
                }

                return voteStatusLabels[indexOfLabel];
            }