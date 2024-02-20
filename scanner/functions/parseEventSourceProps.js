function parseEventSourceProps(raw, meta, sourceDefId, calendar) {
        var leftovers0 = {};
        var props = refineProps(raw, SIMPLE_SOURCE_PROPS, {}, leftovers0);
        var leftovers1 = {};
        var ui = processUnscopedUiProps(leftovers0, calendar, leftovers1);
        props.isFetching = false;
        props.latestFetchId = '';
        props.fetchRange = null;
        props.publicId = String(raw.id || '');
        props.sourceId = String(uid$2++);
        props.sourceDefId = sourceDefId;
        props.meta = meta;
        props.ui = ui;
        props.extendedProps = leftovers1;
        return props;
    }