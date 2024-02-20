function Hidden(props) {
  const { informed, render, userProps, ref } = useField({
    type: 'text',
    ...props
  });

  return render(<input {...informed} {...userProps} ref={ref} type="hidden" />);
}