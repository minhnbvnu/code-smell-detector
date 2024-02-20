function preventAndSave() {
            evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
            me.fireEvent('contentchange');
            me.undoManger && me.undoManger.save();
        }