function Interpolate(parentElement){
	const initialized = Promise.all([models.drums.load(), models.melody.load()])
	initialized.then(() => {
		setStatus('')
	})
	render(html`
		<div id="interpolate">
			<div id="title">
				<span>I</span>
				<span class="expand">N</span>
				<span class="expand">T</span>
				<span class="expand">E</span>
				<span class="expand">R</span>
				<span class="expand">P</span>
				<span class="expand">O</span>
				<span class="expand">L</span>
				<span class="expand">A</span>
				<span>T</span>
				<span>E</span>
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
						<magenta-midi-file label="Input Clips" @change=${validate} inputs="2"></magenta-midi-file>
					</div>
					<div class="plugin-panel__generate">
						<magenta-output-text></magenta-output-text>
						<magenta-button id="generate" label="Initializing..." disabled @click=${generate}></magenta-button>
					</div>
					<div class="plugin-panel">
						<magenta-slider id="variations" value="3" min="1" max="16" label="Steps"></magenta-slider>
						<magenta-slider id="temperature" value="1" min="0" max="2" step="0.1" label="Temperature"></magenta-slider>
					</div>
				</div>
			</div>
		</div>
	`, parentElement)
}