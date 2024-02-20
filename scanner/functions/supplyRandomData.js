function supplyRandomData(context, data) {
    for (var i = 0; i < context.data.requestedCount; i++) {
        DataSupplier.supplyDataAtIndex(context.data.key, data[Math.floor(Math.random() * data.length)], i);
    }
}