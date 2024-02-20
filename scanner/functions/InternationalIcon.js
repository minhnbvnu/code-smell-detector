function InternationalIcon({ aspectRatio, ...rest }) {
	if (aspectRatio === 1) {
		return <InternationalIcon1x1 {...rest}/>
	} else {
		return <InternationalIcon3x2 {...rest}/>
	}
}