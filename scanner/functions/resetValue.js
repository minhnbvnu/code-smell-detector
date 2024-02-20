function resetValue() {
        if (inComposition)
            return;
        text.value = PLACEHOLDER;
        if (useragent.isWebKit)
            syncValue.schedule();
    }