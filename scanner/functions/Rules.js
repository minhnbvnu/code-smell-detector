function Rules() {
  const i18n = useI18n();
  const [activeTab, setActiveTab] = useState(0);
  const subRules = useSubRules();

  const handleTabChange = (e, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Stack spacing={3}>
        <Alert severity="info">
          {i18n("rules_warn_1")}
          <br />
          {i18n("rules_warn_2")}
        </Alert>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label={i18n("personal_rules")} />
            <Tab label={i18n("subscribe_rules")} />
            <Tab label={i18n("overwrite_subscribe_rules")} />
          </Tabs>
        </Box>
        <div hidden={activeTab !== 0}>
          {activeTab === 0 && <UserRules subRules={subRules} />}
        </div>
        <div hidden={activeTab !== 1}>
          {activeTab === 1 && <SubRules subRules={subRules} />}
        </div>
        <div hidden={activeTab !== 2}>{activeTab === 2 && <OwSubRule />}</div>
      </Stack>
    </Box>
  );
}