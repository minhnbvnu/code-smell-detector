function WebfixFields({ rule, webfix, setShow }) {
  const editMode = !!rule;
  const initFormValues = rule || {
    pattern: "",
    selector: "",
    rootSelector: "",
    fixer: FIXER_ALL[0],
  };
  const i18n = useI18n();
  const [disabled, setDisabled] = useState(editMode);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState(initFormValues);

  const { pattern, selector, rootSelector, fixer } = formValues;

  const hasSamePattern = (str) => {
    for (const item of webfix.list || []) {
      if (item.pattern === str && rule?.pattern !== str) {
        return true;
      }
    }
    return false;
  };

  const handleFocus = (e) => {
    e.preventDefault();
    const { name } = e.target;
    setErrors((pre) => ({ ...pre, [name]: "" }));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues((pre) => ({ ...pre, [name]: value }));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (editMode) {
      setDisabled(true);
    } else {
      setShow(false);
    }
    setFormValues(initFormValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!pattern.trim()) {
      errors.pattern = i18n("error_cant_be_blank");
    }
    if (hasSamePattern(pattern)) {
      errors.pattern = i18n("error_duplicate_values");
    }
    if (!selector.trim()) {
      errors.selector = i18n("error_cant_be_blank");
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    if (editMode) {
      // 编辑
      setDisabled(true);
      webfix.put(rule.pattern, formValues);
    } else {
      // 添加
      webfix.add(formValues);
      setShow(false);
      setFormValues(initFormValues);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          size="small"
          label={i18n("pattern")}
          error={!!errors.pattern}
          helperText={errors.pattern}
          name="pattern"
          value={pattern}
          disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          multiline
        />
        <TextField
          size="small"
          label={i18n("root_selector")}
          error={!!errors.rootSelector}
          helperText={errors.rootSelector}
          name="rootSelector"
          value={rootSelector}
          disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          multiline
        />
        <TextField
          size="small"
          label={i18n("selector")}
          error={!!errors.selector}
          helperText={errors.selector}
          name="selector"
          value={selector}
          disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          multiline
        />
        <TextField
          select
          size="small"
          name="fixer"
          value={fixer}
          label={i18n("fixer_function")}
          disabled={disabled}
          onChange={handleChange}
        >
          {FIXER_ALL.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        {webfix &&
          (editMode ? (
            // 编辑
            <Stack direction="row" spacing={2}>
              {disabled ? (
                <>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={(e) => {
                      e.preventDefault();
                      setDisabled(false);
                    }}
                  >
                    {i18n("edit")}
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={(e) => {
                      e.preventDefault();
                      webfix.del(rule.pattern);
                    }}
                  >
                    {i18n("delete")}
                  </Button>
                </>
              ) : (
                <>
                  <Button size="small" variant="contained" type="submit">
                    {i18n("save")}
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={handleCancel}
                  >
                    {i18n("cancel")}
                  </Button>
                </>
              )}
            </Stack>
          ) : (
            // 添加
            <Stack direction="row" spacing={2}>
              <Button size="small" variant="contained" type="submit">
                {i18n("save")}
              </Button>
              <Button size="small" variant="outlined" onClick={handleCancel}>
                {i18n("cancel")}
              </Button>
            </Stack>
          ))}
      </Stack>
    </form>
  );
}