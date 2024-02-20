function ActivityOptions({
  activities,
  selectedActivityType,
  selectedActivity,
  onSelectActivity
}) {
  if (!selectedActivityType) {
    return null;
  }

  const activityOptions = activities[selectedActivityType];

  return (
    <Container>
      <Options>
        {activityOptions.map((activity, index) => (
          <ActivityOption
            key={index}
            label={activity}
            selectedActivity={selectedActivity}
            onSelect={onSelectActivity}
          />
        ))}
      </Options>
    </Container>
  );
}