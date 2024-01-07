function border_image(border_size, svg_contents) {
		var base_size = 8;
		var border_size = border_size;
		var scale = 32;
		var slice_size = border_size * scale;
		var view_size = base_size * scale;
		// transform causes janky buggy garbage
		// var svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="${view_size}px" height="${view_size}px" viewBox="0 0 ${view_size} ${view_size}">
		// 	<g transform="scale(${scale})">
		// 		${svg_contents}
		// 	</g>
		// </svg>`;
		var svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="${view_size}px" height="${view_size}px" viewBox="0 0 ${view_size} ${view_size}">
			${svg_contents.replace(/(d|x|y|width|height|stroke-width)="[^"]*"/g, (attr) => attr.replace(/\d+/g, (n) => n * scale))}
		</svg>`;
		var url = `data:image/svg+xml,${encodeURIComponent(svg)}`;
		return `url("${url}") ${slice_size} / ${border_size}px`;
	}