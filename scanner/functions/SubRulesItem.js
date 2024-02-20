function SubRulesItem({
  index,
  url,
  syncAt,
  selectedUrl,
  delSub,
  setSelectedRules,
  updateDataCache,
  deleteDataCache,
}) {
  const [loading, setLoading] = useState(false);

  const handleDel = async () => {
    try {
      await delSub(url);
      await delSubRules(url);
      await deleteDataCache(url);
    } catch (err) {
      console.log("[del subrules]", err);
    }
  };

  const handleSync = async () => {
    try {
      setLoading(true);
      const rules = await syncSubRules(url);
      if (rules.length > 0 && url === selectedUrl) {
        setSelectedRules(rules);
      }
      await updateDataCache(url);
    } catch (err) {
      console.log("[sync sub rules]", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <FormControlLabel
        value={url}
        control={<Radio />}
        sx={{
          overflowWrap: "anywhere",
        }}
        label={url}
      />

      {syncAt && (
        <span style={{ marginLeft: "0.5em", opacity: 0.5 }}>
          [{new Date(syncAt).toLocaleString()}]
        </span>
      )}

      {loading ? (
        <CircularProgress size={16} />
      ) : (
        <IconButton size="small" onClick={handleSync}>
          <SyncIcon fontSize="small" />
        </IconButton>
      )}

      {index !== 0 && selectedUrl !== url && (
        <IconButton size="small" onClick={handleDel}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </Stack>
  );
}