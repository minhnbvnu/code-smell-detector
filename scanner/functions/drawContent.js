function drawContent(content) {
                editor_model.enabled(true);
                editor_model.instance.setValue(content);
				// to make sure DOM is ready to render content
                setTimeout(function() {
                	editor_model.instance.refresh();
                }, 0);
            }