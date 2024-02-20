function pushOption(index, item, group) {
	    if (item.value === '') {
	      // skip to next iteration
	      // @see http://stackoverflow.com/questions/481601/how-to-skip-to-next-iteration-in-jquery-each-util
	      return true;
	    }

	    var classNames = '';
	    item.disabled && (classNames += options.disabledClass);
	    !item.disabled && item.selected && (classNames += options.selectedClass);

	    optionItems.push({
	      group: group,
	      index: index,
	      classNames: classNames,
	      text: item.text,
	      value: item.value
	    });
	  }