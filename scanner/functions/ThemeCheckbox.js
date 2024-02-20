function ThemeCheckbox({ onChange }) {
  return (
    <Tooltip title="Toggle light/dark theme">
      <Checkbox
        icon={<EmojiObjectsIcon />}
        checkedIcon={<EmojiObjectsIcon />}
        checked={false}
        onChange={onChange}
      />
    </Tooltip>
  );
}