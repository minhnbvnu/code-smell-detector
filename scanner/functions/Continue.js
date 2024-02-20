function Continue(parentElement){
	const initialized = Promise.all([models.drums.load(), models.melody.load()])
	initialized.then(() => {
		setStatus('')
		validate()
	})
	
	render(html`
		<div id="continue">
			<div id="title" class="${ANIMATE ? 'animate' : ''}">
				CONTINU<span>E</span>
			</div>
			<div class="plugin-content">
				<div id="controls">
					<div class="plugin-panel__type">
						<magenta-radio-group
							label="Type"
							values=${JSON.stringify(['drums', 'melody'])}
							id="mode">
					</div>
					<div class="plugin-panel">
						</magenta-radio-group>
						<magenta-midi-file 
							label="Input Clip"
							@change=${validate}></magenta-midi-file>
					</div>
					<div class="plugin-panel__generate">
						<magenta-output-text></magenta-output-text>
						<magenta-button disabled id="generate" label="Initializing..." @click=${generate}></magenta-button>
					</div>
					<div class="plugin-panel">
						<magenta-slider id="variations" value="4" min="1" max="8" label="Variations"></magenta-slider>
						<magenta-slider id="length" value="2" min="1" max="32" label="Length" units="Bars"></magenta-slider>
						<magenta-slider id="temperature" value="1" min="0" max="2" step="0.1" label="Temperature"></magenta-slider>
					</div>
				</div>
			</div>
		</div>
	`, parentElement)
}