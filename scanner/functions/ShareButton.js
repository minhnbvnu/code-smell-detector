function ShareButton({ rules, injectRules, selectedUrl }) {
  const alert = useAlert();
  const i18n = useI18n();
  const handleClick = async () => {
    try {
      const { syncType, syncUrl, syncKey } = await getSyncWithDefault();
      if (syncType !== OPT_SYNCTYPE_WORKER || !syncUrl || !syncKey) {
        alert.warning(i18n("error_sync_setting"));
        return;
      }

      const shareRules = [...rules.list];
      if (injectRules) {
        const subRules = await loadOrFetchSubRules(selectedUrl);
        shareRules.splice(-1, 0, ...subRules);
      }

      const url = await syncShareRules({
        rules: shareRules,
        syncUrl,
        syncKey,
      });

      window.open(url, "_blank");
    } catch (err) {
      alert.warning(i18n("error_got_some_wrong"));
      console.log("[share rules]", err);
    }
  };

  return (
    <Button
      size="small"
      variant="outlined"
      onClick={handleClick}
      startIcon={<ShareIcon />}
    >
      {i18n("share")}
    </Button>
  );
}