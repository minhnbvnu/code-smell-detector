function UserRules({ subRules }) {
  const i18n = useI18n();
  const rules = useRules();
  const [showAdd, setShowAdd] = useState(false);
  const { setting, updateSetting } = useSetting();
  const [keyword, setKeyword] = useState("");

  const injectRules = !!setting?.injectRules;
  const { selectedUrl, selectedRules } = subRules;

  const handleImport = async (data) => {
    try {
      await rules.merge(JSON.parse(data));
    } catch (err) {
      console.log("[import rules]", err);
    }
  };

  const handleInject = () => {
    updateSetting({
      injectRules: !injectRules,
    });
  };

  useEffect(() => {
    if (!showAdd) {
      setKeyword("");
    }
  }, [showAdd]);

  if (!rules.list) {
    return;
  }

  return (
    <Stack spacing={3}>
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

        <UploadButton text={i18n("import")} handleImport={handleImport} />
        <DownloadButton
          data={JSON.stringify([...rules.list].reverse(), null, 2)}
          text={i18n("export")}
          fileName={`kiss-rules_${Date.now()}.json`}
        />

        <ShareButton
          rules={rules}
          injectRules={injectRules}
          selectedUrl={selectedUrl}
        />

        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            rules.clear();
          }}
          startIcon={<ClearAllIcon />}
        >
          {i18n("clear_all")}
        </Button>

        <HelpButton url={URL_KISS_RULES_NEW_ISSUE} />

        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={injectRules}
              onChange={handleInject}
            />
          }
          label={i18n("inject_rules")}
        />
      </Stack>

      {showAdd && (
        <RuleFields
          rules={rules}
          setShow={setShowAdd}
          setKeyword={setKeyword}
        />
      )}

      <Box>
        {rules.list
          .filter(
            (rule) =>
              rule.pattern.includes(keyword) || keyword.includes(rule.pattern)
          )
          .map((rule) => (
            <RuleAccordion key={rule.pattern} rule={rule} rules={rules} />
          ))}
      </Box>

      {injectRules && (
        <Box>
          {selectedRules
            .filter(
              (rule) =>
                rule.pattern.includes(keyword) || keyword.includes(rule.pattern)
            )
            .map((rule) => (
              <RuleAccordion key={rule.pattern} rule={rule} />
            ))}
        </Box>
      )}
    </Stack>
  );
}