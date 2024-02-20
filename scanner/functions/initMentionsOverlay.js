function initMentionsOverlay() {
            elmMentionsOverlay = $(settings.templates.mentionsOverlay()); //Get the HTML code of the mentions' overlay
            elmMentionsOverlay.prependTo(elmWrapperBox); //Insert into elmWrapperBox the mentions overlay
        }