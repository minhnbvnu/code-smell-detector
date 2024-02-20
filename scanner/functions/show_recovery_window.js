function show_recovery_window(no_longer_blank) {
		$recovery_window && $recovery_window.close();
		const $w = $recovery_window = $DialogWindow();
		$w.on("close", ()=> {
			$recovery_window = null;
		});
		$w.title("Recover Document");
		let backup_impossible = false;
		try{window.localStorage}catch(e){backup_impossible = true;}
		$w.$main.append($(`
			<h1>Woah!</h1>
			<p>Your browser may have cleared the canvas due to memory usage.</p>
			<p>Undo to recover the document, and remember to save with <b>File > Save</b>!</p>
			${
				backup_impossible ?
					"<p><b>Note:</b> No automatic backup is possible unless you enable Cookies in your browser.</p>"
					: (
						no_longer_blank ?
							`<p>
								<b>Note:</b> normally a backup is saved automatically,<br>
								but autosave is paused while this dialog is open<br>
								to avoid overwriting the (singular) backup.
							</p>
							<p>
								(See <b>File &gt; Manage Storage</b> to view backups.)
							</p>`
							: ""
					)
				}
			}
		`));
		
		const $undo = $w.$Button("Undo", ()=> {
			undo();
		});
		const $redo = $w.$Button("Redo", ()=> {
			redo();
		});
		const update_buttons_disabled = ()=> {
			$undo.attr("disabled", undos.length < 1);
			$redo.attr("disabled", redos.length < 1);
		};
		$G.on("session-update.session-hook", update_buttons_disabled);
		update_buttons_disabled();

		$w.$Button(localize("Close"), ()=> {
			$w.close();
		});
		$w.center();

		$w.find("button:enabled").focus();
	}