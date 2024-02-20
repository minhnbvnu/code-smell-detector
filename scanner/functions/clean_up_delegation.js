function clean_up_delegation() {
				$G.off("mouseup blur", delegate_pointerup);
				iframe.contentDocument.removeEventListener("mouseup", clean_up_delegation);
			}