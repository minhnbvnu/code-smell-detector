function clearTextSelection(){if(document.selection&&document.selection.empty)try{document.selection.empty()}catch(e){}else if(window.getSelection){var e=window.getSelection();e&&e.removeAllRanges&&e.removeAllRanges()}}