function OwSubRule() {
  const i18n = useI18n();
  const { owSubrule, updateOwSubrule } = useOwSubRule();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    updateOwSubrule({ [name]: value });
  };

  const {
    translator,
    fromLang,
    toLang,
    textStyle,
    transOpen,
    bgColor,
    textDiyStyle,
  } = owSubrule;

  const RemainItem = (
    <MenuItem key={REMAIN_KEY} value={REMAIN_KEY}>
      {i18n("remain_unchanged")}
    </MenuItem>
  );

  const GlobalItem = (
    <MenuItem key={GLOBAL_KEY} value={GLOBAL_KEY}>
      {GLOBAL_KEY}
    </MenuItem>
  );

  return (
    <Stack spacing={2}>
      <Box>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <TextField
              select
              size="small"
              fullWidth
              name="transOpen"
              value={transOpen}
              label={i18n("translate_switch")}
              onChange={handleChange}
            >
              {RemainItem}
              {GlobalItem}
              <MenuItem value={"true"}>{i18n("default_enabled")}</MenuItem>
              <MenuItem value={"false"}>{i18n("default_disabled")}</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <TextField
              select
              size="small"
              fullWidth
              name="translator"
              value={translator}
              label={i18n("translate_service")}
              onChange={handleChange}
            >
              {RemainItem}
              {GlobalItem}
              {OPT_TRANS_ALL.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <TextField
              select
              size="small"
              fullWidth
              name="fromLang"
              value={fromLang}
              label={i18n("from_lang")}
              onChange={handleChange}
            >
              {RemainItem}
              {GlobalItem}
              {OPT_LANGS_FROM.map(([lang, name]) => (
                <MenuItem key={lang} value={lang}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <TextField
              select
              size="small"
              fullWidth
              name="toLang"
              value={toLang}
              label={i18n("to_lang")}
              onChange={handleChange}
            >
              {RemainItem}
              {GlobalItem}
              {OPT_LANGS_TO.map(([lang, name]) => (
                <MenuItem key={lang} value={lang}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <TextField
              select
              size="small"
              fullWidth
              name="textStyle"
              value={textStyle}
              label={i18n("text_style")}
              onChange={handleChange}
            >
              {RemainItem}
              {GlobalItem}
              {OPT_STYLE_ALL.map((item) => (
                <MenuItem key={item} value={item}>
                  {i18n(item)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {OPT_STYLE_USE_COLOR.includes(textStyle) && (
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <TextField
                size="small"
                fullWidth
                name="bgColor"
                value={bgColor}
                label={i18n("bg_color")}
                onChange={handleChange}
              />
            </Grid>
          )}
        </Grid>
      </Box>

      {textStyle === OPT_STYLE_DIY && (
        <TextField
          size="small"
          label={i18n("diy_style")}
          helperText={i18n("diy_style_helper")}
          name="textDiyStyle"
          value={textDiyStyle}
          onChange={handleChange}
          multiline
        />
      )}
    </Stack>
  );
}