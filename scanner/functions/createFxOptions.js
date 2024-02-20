function createFxOptions ( pane ) {
			var	o = options[pane]
			,	d = options.panes;
			// ensure fxSettings key to avoid errors
			if (!o.fxSettings) o.fxSettings = {};
			if (!d.fxSettings) d.fxSettings = {};

			$.each(["_open","_close","_size"], function (i,n) {
				var
					sName		= "fxName"+ n
				,	sSpeed		= "fxSpeed"+ n
				,	sSettings	= "fxSettings"+ n
					// recalculate fxName according to specificity rules
				,	fxName = o[sName] =
						o[sName]	// options.west.fxName_open
					||	d[sName]	// options.panes.fxName_open
					||	o.fxName	// options.west.fxName
					||	d.fxName	// options.panes.fxName
					||	"none"		// MEANS $.layout.defaults.panes.fxName == "" || false || null || 0
				;
				// validate fxName to ensure is valid effect - MUST have effect-config data in options.effects
				if (fxName === "none" || !options.effects[fxName] || !$.effects || (!$.effects[fxName] && !$.effects.effect[fxName]))
					fxName = o[sName] = "none"; // effect not loaded OR unrecognized fxName

				// set vars for effects subkeys to simplify logic
				var	fx		= options.effects[fxName] || {}	// effects.slide
				,	fx_all	= fx.all	|| null				// effects.slide.all
				,	fx_pane	= fx[pane]	|| null				// effects.slide.west
				;
				// create fxSpeed[_open|_close|_size]
				o[sSpeed] =
					o[sSpeed]				// options.west.fxSpeed_open
				||	d[sSpeed]				// options.west.fxSpeed_open
				||	o.fxSpeed				// options.west.fxSpeed
				||	d.fxSpeed				// options.panes.fxSpeed
				||	null					// DEFAULT - let fxSetting.duration control speed
				;
				// create fxSettings[_open|_close|_size]
				o[sSettings] = $.extend(
					true
				,	{}
				,	fx_all					// effects.slide.all
				,	fx_pane					// effects.slide.west
				,	d.fxSettings			// options.panes.fxSettings
				,	o.fxSettings			// options.west.fxSettings
				,	d[sSettings]			// options.panes.fxSettings_open
				,	o[sSettings]			// options.west.fxSettings_open
				);
			});

			// DONE creating action-specific-settings for this pane,
			// so DELETE generic options - are no longer meaningful
			delete o.fxName;
			delete o.fxSpeed;
			delete o.fxSettings;
		}