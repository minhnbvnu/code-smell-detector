function isInteractionValid(interaction, calendar) {
        return isNewPropsValid({ eventDrag: interaction }, calendar); // HACK: the eventDrag props is used for ALL interactions
    }