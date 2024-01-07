function determineFittingAction(fittingMode, currentSize, availableSize) {
        switch (fittingMode) {
            case FITTING_NONE:
                return FITTING_ACTION.NONE;

            case FITTING_STRETCH:
                if (currentSize < availableSize) {
                    return FITTING_ACTION.APPLY_STRETCHING;
                }

                return FITTING_ACTION.NONE;

            case FITTING_SHRINK:
                if (currentSize >= availableSize) {
                    return FITTING_ACTION.APPLY_SHRINKING;
                }

                return FITTING_ACTION.NONE;

            case FITTING_BOTH:
                if (currentSize < availableSize) {
                    return FITTING_ACTION.APPLY_STRETCHING;
                }

                return FITTING_ACTION.APPLY_SHRINKING;

            default:
                throw new Error(`Unrecognized fitting mode: ${fittingMode}`);
        }
    }