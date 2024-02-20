async function syncSettings(settings) {
  if (!remoteSettingsDB()) return settings;

  try {
    const remote = await remoteSettingsDB().get('settings');
    const base = remote.currency.base;
    const secondary = union(
      settings.currency.base,
      settings.currency.secondary,
      remote.currency.secondary
    ).filter(code => code !== base);

    const synced = {
      currency: { base, secondary },
      exchangeRate:
        settings.currency.base === base
          ? { ...settings.exchangeRate, ...remote.exchangeRate }
          : await fetchExchangeRates(base, secondary),
      isSetupComplete: remote.isSetupComplete
    };

    if (!isEqual(pick(settings, Object.keys(synced)), synced)) {
      await save(synced);
    }

    return synced;
  } catch (error) {
    return settings;
  }
}