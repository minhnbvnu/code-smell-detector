function CharacterPicker(props) {
  const { setCharacter, character } = React.useContext(GameContext);

  return (
    <Picker
      selectedValue={character}
      style={styles.picker}
      onValueChange={(itemValue, itemIndex) => {
        setCharacter(itemValue);
      }}
    >
      {Object.keys(Characters).map((id) => (
        <Picker.Item
          key={id}
          label={Characters[id].name}
          value={Characters[id].id}
        />
      ))}
    </Picker>
  );
}