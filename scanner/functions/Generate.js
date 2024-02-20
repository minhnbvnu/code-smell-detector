function Generate(parentElement){
	const initialized = Promise.all([models.drums.load(), models.melody.load()])
	initialized.then(() => {
		setStatus('')
	})
	
	render(html`
		<div id="generate-plugin">
			<div id="title" class="${ANIMATE ? 'animate' : ''}">
				<span>
					GENERATE
				</span> 4 BARS
			</div>
			<div class="plugin-content">
				<div id="controls">
					<div class="plugin-panel__type">
						<magenta-radio-group
								label="Type"
								values=${JSON.stringify(['drums', 'melody'])}
								id="mode">
							</magenta-radio-group>
					</div>
					<div class="plugin-panel">
						<magenta-midi-file label="Output Location" output @change=${validate} inputs="1"></magenta-midi-file>
					</div>
					<div class="plugin-panel__generate">
						<magenta-output-text></magenta-output-text>
						<magenta-button id="generate" label="Initializing..." disabled @click=${generate}></magenta-button>
					</div>
				</div>
					<div class="plugin-panel">
						<magenta-slider id="variations" value="8" min="1" max="16" label="Variations"></magenta-slider>
						<magenta-slider id="temperature" value="1" min="0" max="2" step="0.1" label="Temperature"></magenta-slider>
					</div>
				</div>
		</div>
	`, parentElement)
}