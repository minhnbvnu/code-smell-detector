function eraseSelection(i,o){var s=i.value;s=s.slice(0,o.start)+s.slice(o.end),i.value=s,setCaretPosition(i,o.start)}