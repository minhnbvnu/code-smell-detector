function makeBlackToInsetFilter() {
	if (document.getElementById("os-gui-black-to-inset-filter")) {
		return;
	}
	const svg_xml = `
		<svg style="position: absolute; pointer-events: none; bottom: 100%;">
			<defs>
				<filter id="os-gui-black-to-inset-filter" x="0" y="0" width="1px" height="1px">
					<feColorMatrix
						in="SourceGraphic"
						type="matrix"
						values="
							1 0 0 0 0
							0 1 0 0 0
							0 0 1 0 0
							-1000 -1000 -1000 1 0
						"
						result="black-parts-isolated"
					/>
					<feFlood result="shadow-color" flood-color="var(--ButtonShadow)"/>
					<feFlood result="hilight-color" flood-color="var(--ButtonHilight)"/>
					<feOffset in="black-parts-isolated" dx="1" dy="1" result="offset"/>
					<feComposite in="hilight-color" in2="offset" operator="in" result="hilight-colored-offset"/>
					<feComposite in="shadow-color" in2="black-parts-isolated" operator="in" result="shadow-colored"/>
					<feMerge>
						<feMergeNode in="hilight-colored-offset"/>
						<feMergeNode in="shadow-colored"/>
					</feMerge>
				</filter>
			</defs>
		</svg>
	`;
	const $svg = $(svg_xml);
	$svg.appendTo("body");
}