function ShortcutInput({ value, onChange, label, helperText }) {
  const [disabled, setDisabled] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    if (disabled) {
      return;
    }

    inputRef.current.focus();
    onChange([]);

    const clearShortcut = shortcutListener((curkeys, allkeys) => {
      onChange(allkeys);
      if (curkeys.length === 0) {
        setDisabled(true);
      }
    }, inputRef.current);

    return () => {
      clearShortcut();
    };
  }, [disabled, onChange]);

  return (
    <Stack direction="row" alignItems="flex-start">
      <TextField
        size="small"
        label={label}
        name={label}
        value={value.map((item) => (item === " " ? "Space" : item)).join(" + ")}
        fullWidth
        inputRef={inputRef}
        disabled={disabled}
        onBlur={() => {
          setDisabled(true);
        }}
        helperText={helperText}
      />
      <IconButton
        onClick={() => {
          setDisabled(false);
        }}
      >
        {<EditIcon />}
      </IconButton>
    </Stack>
  );
}