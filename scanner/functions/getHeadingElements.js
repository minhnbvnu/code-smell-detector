function getHeadingElements($editable) {
		return (
			$editable.find('h1,h2,h3,h4,h5,h6')
			        .not('.aloha-customized,.aloha-editable,.aloha-block')
		);
	}