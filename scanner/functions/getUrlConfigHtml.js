function getUrlConfigHtml() {
	var i, j, val,
		escaped, escapedTooltip,
		selection = false,
		len = config.urlConfig.length,
		urlConfigHtml = "";

	for ( i = 0; i < len; i++ ) {
		val = config.urlConfig[ i ];
		if ( typeof val === "string" ) {
			val = {
				id: val,
				label: val
			};
		}

		escaped = escapeText( val.id );
		escapedTooltip = escapeText( val.tooltip );

		if ( config[ val.id ] === undefined ) {
			config[ val.id ] = QUnit.urlParams[ val.id ];
		}

		if ( !val.value || typeof val.value === "string" ) {
			urlConfigHtml += "<input id='qunit-urlconfig-" + escaped +
				"' name='" + escaped + "' type='checkbox'" +
				( val.value ? " value='" + escapeText( val.value ) + "'" : "" ) +
				( config[ val.id ] ? " checked='checked'" : "" ) +
				" title='" + escapedTooltip + "' /><label for='qunit-urlconfig-" + escaped +
				"' title='" + escapedTooltip + "'>" + val.label + "</label>";
		} else {
			urlConfigHtml += "<label for='qunit-urlconfig-" + escaped +
				"' title='" + escapedTooltip + "'>" + val.label +
				": </label><select id='qunit-urlconfig-" + escaped +
				"' name='" + escaped + "' title='" + escapedTooltip + "'><option></option>";

			if ( QUnit.is( "array", val.value ) ) {
				for ( j = 0; j < val.value.length; j++ ) {
					escaped = escapeText( val.value[ j ] );
					urlConfigHtml += "<option value='" + escaped + "'" +
						( config[ val.id ] === val.value[ j ] ?
							( selection = true ) && " selected='selected'" : "" ) +
						">" + escaped + "</option>";
				}
			} else {
				for ( j in val.value ) {
					if ( hasOwn.call( val.value, j ) ) {
						urlConfigHtml += "<option value='" + escapeText( j ) + "'" +
							( config[ val.id ] === j ?
								( selection = true ) && " selected='selected'" : "" ) +
							">" + escapeText( val.value[ j ] ) + "</option>";
					}
				}
			}
			if ( config[ val.id ] && !selection ) {
				escaped = escapeText( config[ val.id ] );
				urlConfigHtml += "<option value='" + escaped +
					"' selected='selected' disabled='disabled'>" + escaped + "</option>";
			}
			urlConfigHtml += "</select>";
		}
	}

	return urlConfigHtml;
}