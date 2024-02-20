function keysFromBundle(method, bundle, keys, translations) {
  const messageErrors = [];
  const missingIds = new Set();

  keys.forEach(({ id, args }, i) => {
    if (translations[i] !== undefined) {
      return;
    }

    let message = bundle.getMessage(id);
    if (message) {
      messageErrors.length = 0;
      translations[i] = method(bundle, messageErrors, message, args);
      if (messageErrors.length > 0 && typeof console !== "undefined") {
        const locale = bundle.locales[0];
        const errors = messageErrors.join(", ");
        // eslint-disable-next-line max-len
        console.warn(
          `[fluent][resolver] errors in ${locale}/${id}: ${errors}.`
        );
      }
    } else {
      missingIds.add(id);
    }
  });

  return missingIds;
}