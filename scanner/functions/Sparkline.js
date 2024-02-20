function Sparkline({
	values,
	min = Math.min(...values),
	max = Math.max(...values),
	color = '#ffffff',
	gradient,
	formatAxis = (val) => val,
	timeSeries,
}) {
	// If we only have one data point, duplicate it to draw a straight line.
	if (values.length === 1) values.push(...values);

	const minVal = Math.min(...values);
	const maxVal = Math.max(...values);
	const caption = `Sparkline ranging between ${formatAxis(minVal)} and ${formatAxis(maxVal)}.`;

	const data = values.map((val) => Math.max(0, Math.round(val) - min));
	const maxY = Math.max(...data, max - min);
	const [width, height] = [70, 40];

	const startTime = timeSeries?.at(0)?.timestamp;
	const endTime = timeSeries?.at(-1)?.timestamp;

	const d = getD(data, width, height, maxY);
	const id = uuid();

	return `<div class="sparkline">
	<div class="y-axis" aria-hidden="true">
		<div>${formatAxis(min)}</div>
		<div>${formatAxis(max)}</div>
	</div>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		preserveAspectRatio="none"
		viewBox="0 0 ${width} ${height}"
	>
		<title>${caption}</title>
		<path
			fill="transparent"
			stroke="${gradient ? `url(#${id})` : color}" d="${d}"
		/>
		${gradient ? getLinearGradient(gradient, id) : ''}
	</svg>
	${
		startTime && endTime
			? `
	<div class="x-axis">
		<time datetime="${msToISO(startTime)}">${msToDate(startTime)}</time>
		<time datetime="${msToISO(startTime)}">${msToDate(endTime)}</time>
	</div>`
			: ''
	}
</div>`;
}