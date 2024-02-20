function FormButton({ buttonTitle, ...rest }) {
  return (
    <Pressable style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </Pressable>
  );
}