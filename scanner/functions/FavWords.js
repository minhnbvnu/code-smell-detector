function FavWords() {
  const i18n = useI18n();
  const { loading, favWords, mergeWords, clearWords } = useFavWords();
  const favList = Object.entries(favWords).sort((a, b) =>
    a[0].localeCompare(b[0])
  );
  const downloadList = favList.map(([word]) => word);

  const handleImport = async (data) => {
    try {
      const newWords = data
        .split("\n")
        .map((line) => line.split(",")[0].trim())
        .filter(isValidWord);
      await mergeWords(newWords);
    } catch (err) {
      console.log("[import rules]", err);
    }
  };

  return (
    <Box>
      <Stack spacing={3}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          useFlexGap
          flexWrap="wrap"
        >
          <UploadButton
            text={i18n("import")}
            handleImport={handleImport}
            fileType="text"
            fileExts={[".txt", ".csv"]}
          />
          <DownloadButton
            data={downloadList.join("\n")}
            text={i18n("export")}
            fileName={`kiss-words_${Date.now()}.txt`}
          />
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              clearWords();
            }}
            startIcon={<ClearAllIcon />}
          >
            {i18n("clear_all")}
          </Button>
        </Stack>

        <Box>
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            favList.map(([word, { createdAt }], index) => (
              <FavAccordion
                key={word}
                index={index}
                word={word}
                createdAt={createdAt}
              />
            ))
          )}
        </Box>
      </Stack>
    </Box>
  );
}