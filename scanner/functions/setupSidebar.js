function setupSidebar(plugin) {

		Aloha.ready(function () {
			plugin.sidebar = Sidebars.right.show().addPanel({
				id       : nsClass('sidebar-panel'),
				title    : 'Citation',
				content  : '',
				expanded : true,
				activeOn : 'q, blockquote',

				onInit: function () {
					var panel = this;

					var additionalReferenceContainer = plugin.referenceContainer
							? '<label class="{panel-label}" for="{note-field}-textarea">Note</label>'
							+ '<div class="{panel-field} {note-field}" style="margin: 5px;">'
							+ '<textarea id="{note-field}-textarea"></textarea></div>'
							: '';

					var content = this.setContent(renderTemplate(
						'<label class="{panel-label}" for="{link-field}-input">Link</label>' +
						'<div class="{panel-field} {link-field}" ' + 
						'style="margin: 5px;"><input type="text" id="{link-field}-input" /></div>' +
						additionalReferenceContainer
					)).content;

					content.find('input, textarea').bind('keyup change', function () {
						var noteValue = panel.content.find(nsSel('note-field textarea')).val();
						var linkValue = panel.content.find(nsSel('link-field input')).val();

						if (plugin.showOnToolbar) {
							plugin.citeNoteField.setValue(noteValue);
							plugin.citeHrefField.setValue(linkValue);
						}
						plugin.addCiteDetails(
							panel.content.attr('data-cite-id'),
							linkValue,
							noteValue
						);
					});
				},

				/**
				 * Invoked during aloha-selection-changed, if activeOn function
				 * returns true for the current selection. Will populate panel
				 * fields with the details of the selected citation if they are
				 * already available.  If no citation exists for the selected
				 * quotation, then one will be created for it first.
				 */
				onActivate: function (effective) {
					var activeUid = effective.attr('data-cite-id');
					if (!activeUid) {
						activeUid = ++uid;
						effective.addClass([nsClass('wrapper')].join(' '));
						effective.attr('data-cite-id', activeUid);
					}
					var index = plugin.getIndexOfCitation(activeUid);
					this.content.attr('data-cite-id', activeUid);
					this.content.find(nsSel('link-field input'))
					    .val(effective.attr('cite'));
					this.content.find(nsSel('note-field textarea'))
					    .val(plugin.citations[index].note);
				}
			});
			plugin.sideBarPanel = Sidebars.right.getPanelById(nsClass('sidebar-panel'));
		});
	}