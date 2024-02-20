function applyEventNormalization({ nodeName, attributes }) {
	if (!attributes || typeof nodeName !== 'string') return;
	let props = {};
	for (let i in attributes) {
		props[i.toLowerCase()] = i;
	}
	if (props.ondoubleclick) {
		attributes.ondblclick = attributes[props.ondoubleclick];
		delete attributes[props.ondoubleclick];
	}
	// for *textual inputs* (incl textarea), normalize `onChange` -> `onInput`:
	if (
		props.onchange &&
		(nodeName === 'textarea' || (nodeName.toLowerCase() === 'input' && !/^fil|che|rad/i.test(attributes.type)))
	) {
		let normalized = props.oninput || 'oninput';
		if (!attributes[normalized]) {
			attributes[normalized] = multihook([attributes[normalized], attributes[props.onchange]]);
			delete attributes[props.onchange];
		}
	}
}