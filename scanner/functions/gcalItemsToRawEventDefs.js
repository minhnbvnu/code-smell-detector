function gcalItemsToRawEventDefs(items, gcalTimezone) {
        return items.map(function (item) {
            return gcalItemToRawEventDef(item, gcalTimezone);
        });
    }