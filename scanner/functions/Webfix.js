function Webfix() {
  const [loading, setLoading] = useState(false);
  const [sites, setSites] = useState([]);
  const i18n = useI18n();
  const alert = useAlert();
  const { setting, updateSetting } = useSetting();
  const [showAdd, setShowAdd] = useState(false);
  const webfix = useWebfixRules();

  const loadSites = useCallback(async () => {
    const sites = await loadOrFetchWebfix(process.env.REACT_APP_WEBFIXURL);
    setSites(sites);
  }, []);

  const handleSyncTest = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await syncWebfix(process.env.REACT_APP_WEBFIXURL);
      await loadSites();
      alert.success(i18n("sync_success"));
    } catch (err) {
      console.log("[sync webfix]", err);
      alert.error(i18n("sync_failed"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await loadSites();
      } catch (err) {
        console.log("[load webfix]", err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [loadSites]);

  return (
    <Box>
      <Stack spacing={3}>
        <Alert severity="info">{i18n("patch_setting_help")}</Alert>

        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          useFlexGap
          flexWrap="wrap"
        >
          <Button
            size="small"
            variant="contained"
            disabled={showAdd}
            onClick={(e) => {
              e.preventDefault();
              setShowAdd(true);
            }}
          >
            {i18n("add")}
          </Button>

          <Button
            size="small"
            variant="outlined"
            disabled={loading}
            onClick={handleSyncTest}
            startIcon={<SyncIcon />}
          >
            {i18n("sync_now")}
          </Button>
          <HelpButton url={URL_KISS_RULES_NEW_ISSUE} />
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={!!setting.injectWebfix}
                onChange={() => {
                  updateSetting({
                    injectWebfix: !setting.injectWebfix,
                  });
                }}
              />
            }
            label={i18n("inject_webfix")}
          />
        </Stack>

        {showAdd && <WebfixFields webfix={webfix} setShow={setShowAdd} />}

        {webfix.list?.length > 0 && (
          <Box>
            {webfix.list.map((rule) => (
              <WebfixAccordion key={rule.pattern} rule={rule} webfix={webfix} />
            ))}
          </Box>
        )}

        {setting.injectWebfix && (
          <Box>
            {loading ? (
              <center>
                <CircularProgress size={16} />
              </center>
            ) : (
              sites.map((rule) => (
                <WebfixAccordion key={rule.pattern} rule={rule} />
              ))
            )}
          </Box>
        )}
      </Stack>
    </Box>
  );
}