function hideHandler(e) {
  				var inContainer = moduleFilter.contains(e.target);

  				if (e.keyCode === 27 || !inContainer) {
  					if (e.keyCode === 27 && inContainer) {
  						moduleSearch.focus();
  					}
  					dropDown.style.display = "none";
  					removeEvent(document$$1, "click", hideHandler);
  					removeEvent(document$$1, "keydown", hideHandler);
  					moduleSearch.value = "";
  					searchInput();
  				}
  			}