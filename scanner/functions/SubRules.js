function SubRules({ subRules }) {
  const {
    subList,
    selectSub,
    addSub,
    delSub,
    selectedUrl,
    selectedRules,
    setSelectedRules,
    loading,
  } = subRules;
  const { dataCaches, updateDataCache, deleteDataCache, reloadSync } =
    useSyncCaches();

  const handleSelect = (e) => {
    const url = e.target.value;
    selectSub(url);
  };

  useEffect(() => {
    reloadSync();
  }, [selectedRules, reloadSync]);

  return (
    <Stack spacing={3}>
      <SubRulesEdit
        subList={subList}
        addSub={addSub}
        updateDataCache={updateDataCache}
      />

      <RadioGroup value={selectedUrl} onChange={handleSelect}>
        {subList.map((item, index) => (
          <SubRulesItem
            key={item.url}
            url={item.url}
            syncAt={dataCaches[item.url]}
            index={index}
            selectedUrl={selectedUrl}
            delSub={delSub}
            setSelectedRules={setSelectedRules}
            updateDataCache={updateDataCache}
            deleteDataCache={deleteDataCache}
          />
        ))}
      </RadioGroup>

      <Box>
        {loading ? (
          <center>
            <CircularProgress />
          </center>
        ) : (
          selectedRules.map((rule) => (
            <RuleAccordion key={rule.pattern} rule={rule} />
          ))
        )}
      </Box>
    </Stack>
  );
}