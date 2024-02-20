function populateDropdown(query, results) {
            elmAutocompleteList.show(); //Shows the autocomplete list

            if(!settings.allowRepeat) {
                // Filter items that has already been mentioned
                var mentionValues = _.pluck(mentionsCollection, 'value');
                results = _.reject(results, function (item) {
                    return _.include(mentionValues, item.name);
                });
            }

            if (!results.length) { //If there are not elements hide the autocomplete list
                hideAutoComplete();
                return;
            }

            elmAutocompleteList.empty(); //Remove all li elements in autocomplete list
            var elmDropDownList = $("<ul>").appendTo(elmAutocompleteList).hide(); //Inserts a ul element to autocomplete div and hide it

            _.each(results, function (item, index) {
                var itemUid = _.uniqueId('mention_'); //Gets the item with unique id

                autocompleteItemCollection[itemUid] = _.extend({}, item, {value: item.name}); //Inserts the new item to autocompleteItemCollection

                var elmListItem = $(settings.templates.autocompleteListItem({
                    'id'      : utils.htmlEncode(item.id),
                    'display' : utils.htmlEncode(item.name),
                    'type'    : utils.htmlEncode(item.type),
                    'content' : utils.highlightTerm(utils.htmlEncode((item.display ? item.display : item.name)), query)
                })).attr('data-uid', itemUid); //Inserts the new item to list

                //If the index is 0
                if (index === 0) {
                    selectAutoCompleteItem(elmListItem);
                }

                //If show avatars is true
                if (settings.showAvatars) {
                    var elmIcon;

                    //If the item has an avatar
                    if (item.avatar) {
                        elmIcon = $(settings.templates.autocompleteListItemAvatar({ avatar : item.avatar }));
                    } else { //If not then we set an default icon
                        elmIcon = $(settings.templates.autocompleteListItemIcon({ icon : item.icon }));
                    }
                    elmIcon.prependTo(elmListItem); //Inserts the elmIcon to elmListItem
                }
                elmListItem = elmListItem.appendTo(elmDropDownList); //Insets the elmListItem to elmDropDownList
            });

            elmAutocompleteList.show(); //Shows the elmAutocompleteList div
	        if (settings.onCaret) {
		        positionAutocomplete(elmAutocompleteList, elmInputBox);
            }
	        elmDropDownList.show(); //Shows the elmDropDownList
        }