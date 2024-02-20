function bogusSelect() {
      var sel = document.getSelection(); // If "nothing" is selected...

      if (!document.queryCommandEnabled("copy") && sel.isCollapsed) {
        // ... temporarily select the entire body.
        //
        // We select the entire body because:
        // - it's guaranteed to exist,
        // - it works (unlike, say, document.head, or phantom element that is
        //   not inserted into the DOM),
        // - it doesn't seem to flicker (due to the synchronous copy event), and
        // - it avoids modifying the DOM (can trigger mutation observers).
        //
        // Because we can't do proper feature detection (we already checked
        // document.queryCommandEnabled("copy") , which actually gives a false
        // negative for Blink when nothing is selected) and UA sniffing is not
        // reliable (a lot of UA strings contain "Safari"), this will also
        // happen for some browsers other than Safari. :-()
        var range = document.createRange();
        range.selectNodeContents(document.body);
        sel.removeAllRanges();
        sel.addRange(range);
        _bogusSelection = true;
      }
    }