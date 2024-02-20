function Groove(parentElement){
	model.load().then(() => {
		setStatus('')
	})

	render(html`
		<div id="groove">
			<div id="title" class="${ANIMATE ? 'animate' : ''}">
				<span>G</span>
				<span>R</span>
				<span>O</span>
				<span>O</span>
				<span>V</span>
				<span>E</span>
			</div>
			<div class="plugin-content">
				<div id="controls">
					<div class="plugin-panel__type">
						<magenta-radio-group
							label="Type"
							values=${JSON.stringify(['drums'])}
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
						<magenta-slider id="temperature" value="1" min="0" max="2" step="0.1" label="Temperature"></magenta-slider>
					</div>
				</div>
			</div>
		</div>
	`, parentElement)
}