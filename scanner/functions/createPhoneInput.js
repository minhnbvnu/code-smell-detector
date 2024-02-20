function createPhoneInput(defaultMetadata) {
	let PhoneInput = ({
		inputComponent,
		metadata = defaultMetadata,
		...rest
	}, ref) => (
		<PhoneInput_
			{...rest}
			ref={ref}
			metadata={metadata}
			Component={InputBasic}
			inputComponent={PhoneTextInput}
			TextInputComponent={inputComponent}
		/>
	)

	PhoneInput = React.forwardRef(PhoneInput)

	PhoneInput.propTypes = {
		/**
		 * Allows specifying a custom input field component,
		 * like a "Material UI" input field or something.
		 */
		inputComponent: PropTypes.elementType,

		/**
		 * `libphonenumber-js` metadata.
		 */
		metadata: metadataType
	}

	return PhoneInput
}