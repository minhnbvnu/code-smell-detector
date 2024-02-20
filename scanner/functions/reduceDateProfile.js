function reduceDateProfile(currentDateProfile, action, currentDate, viewType, calendar) {
        var newDateProfile;
        switch (action.type) {
            case 'PREV':
                newDateProfile = calendar.dateProfileGenerators[viewType].buildPrev(currentDateProfile, currentDate);
                break;
            case 'NEXT':
                newDateProfile = calendar.dateProfileGenerators[viewType].buildNext(currentDateProfile, currentDate);
                break;
            case 'SET_DATE':
                if (!currentDateProfile.activeRange ||
                    !rangeContainsMarker(currentDateProfile.currentRange, action.dateMarker)) {
                    newDateProfile = calendar.dateProfileGenerators[viewType].build(action.dateMarker, undefined, true // forceToValid
                    );
                }
                break;
            case 'SET_VIEW_TYPE':
                var generator = calendar.dateProfileGenerators[viewType];
                if (!generator) {
                    throw new Error(viewType ?
                        'The FullCalendar view "' + viewType + '" does not exist. Make sure your plugins are loaded correctly.' :
                        'No available FullCalendar view plugins.');
                }
                newDateProfile = generator.build(action.dateMarker || currentDate, undefined, true // forceToValid
                );
                break;
        }
        if (newDateProfile &&
            newDateProfile.isValid &&
            !(currentDateProfile && isDateProfilesEqual(currentDateProfile, newDateProfile))) {
            return newDateProfile;
        }
        else {
            return currentDateProfile;
        }
    }