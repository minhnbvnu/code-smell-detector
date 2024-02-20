function PhoneInput({
		// `<input type="tel"/>`.
		type = 'tel',
		// Remember (and autofill) the value as a phone number.
		autoComplete = 'tel',
		smartCaret = true,
		metadata = defaultMetadata,
		...rest
	}, ref) {
		return (
			<PhoneInput_
				{...rest}
				type={type}
				autoComplete={autoComplete}
				metadata={metadata}
				ref={ref}
				Component={smartCaret ? InputSmart : InputBasic}
			/>
		)
	}