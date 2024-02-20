function keysFromContext(method, sanitizeArgs, ctx, keys, prev) {
  const entityErrors = [];
  const result = {
    errors: new Array(keys.length),
    withoutFatal: new Array(keys.length),
    hasFatalErrors: false,
  };

  result.translations = keys.map((key, i) => {
    // Use a previously formatted good value if it had no errors.
    if (prev && !prev.errors[i] ) {
      return prev.translations[i];
    }

    // Clear last entity's errors.
    entityErrors.length = 0;
    const args = sanitizeArgs(key[1]);
    const translation = method(ctx, entityErrors, key[0], args);

    // No errors still? Use this translation as fallback to the previous one
    // which had errors.
    if (entityErrors.length === 0) {
      return translation;
    }

    // The rest of this function handles the scenario in which the translation
    // was formatted with errors.  Copy the errors to the result object so that
    // the Localization can handle them (e.g. console.warn about them).
    result.errors[i] = entityErrors.slice();

    // Formatting errors are not fatal and the translations are usually still
    // usable and can be good fallback values.  Fatal errors should signal to
    // the Localization that another fallback should be loaded.
    if (!entityErrors.some(isL10nError)) {
      result.withoutFatal[i] = true;
    } else if (!result.hasFatalErrors) {
      result.hasFatalErrors = true;
    }

    // Use the previous translation for this `key` even if it had formatting
    // errors.  This is usually closer the user's preferred language anyways.
    if (prev && prev.withoutFatal[i]) {
      // Mark this previous translation as a good potential fallback value in
      // case of further fallbacks.
      result.withoutFatal[i] = true;
      return prev.translations[i];
    }

    // If no good or almost good previous translation is available, return the
    // current translation.  In case of minor errors it's a partially
    // formatted translation.  In the worst-case scenario it an identifier of
    // the requested entity.
    return translation;
  });

  return result;
}