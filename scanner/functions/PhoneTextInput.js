function PhoneTextInput({
  onChange,
  // By default, shows phone number suggestion(s) when the user focuses the input field.
  autoCompleteType = 'tel',
  // By default, uses the default React Native `TextInput` component.
  TextInputComponent = TextInput,
  ...rest
}, ref) {
  // Instead of `onChangeText(value: string)` it could use
  // `onChange(nativeEvent: Event)` and get `value` from `nativeEvent.text`.
  const onChangeText = useCallback((value) => {
    onChange({
      preventDefault() { this.defaultPrevented = true },
      target: { value }
    })
  }, [onChange])

  // React Native `<TextInput/>` supports properties:
  // * `placeholder: string?`
  // * `autoFocus: boolean?`
  // * `value: string?`
  // plus the ones mentioned below:
  return (
    <TextInputComponent
      ref={ref}
      autoCompleteType={autoCompleteType}
      keyboardType="phone-pad"
      onChangeText={onChangeText}
      {...rest}
    />
  )
}