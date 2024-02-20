function ActivityTypeButton({
  label,
  selectedActivityType,
  selectActivityType
}) {
  const isSelected = selectedActivityType === label;

  return (
    <Transition
      duration={QUICK_TRANS_TIME}
      value={!selectedActivityType || selectedActivityType === label ? 1 : 0.3}
    >
      {opacity => (
        <Container
          selectedActivityType={selectedActivityType}
          label={label}
          style={{ opacity }}
        >
          <Button
            label={label}
            onPress={() => selectActivityType(isSelected ? null : label)}
          />
        </Container>
      )}
    </Transition>
  );
}