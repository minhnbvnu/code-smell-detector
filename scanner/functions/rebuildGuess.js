function rebuildGuess () {

        // use Intl API when available and returning valid time zone
        try {
            var intlName = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (intlName && intlName.length > 3) {
                var name = names[normalizeName(intlName)];
                if (name) {
                    return name;
                }
                logError("Moment Timezone found " + intlName + " from the Intl api, but did not have that data loaded.");
            }
        } catch (e) {
            // Intl unavailable, fall back to manual guessing.
        }

        var offsets = userOffsets(),
            offsetsLength = offsets.length,
            guesses = guessesForUserOffsets(offsets),
            zoneScores = [],
            zoneScore, i, j;

        for (i = 0; i < guesses.length; i++) {
            zoneScore = new ZoneScore(getZone(guesses[i]), offsetsLength);
            for (j = 0; j < offsetsLength; j++) {
                zoneScore.scoreOffsetAt(offsets[j]);
            }
            zoneScores.push(zoneScore);
        }

        zoneScores.sort(sortZoneScores);

        return zoneScores.length > 0 ? zoneScores[0].zone.name : undefined;
    }