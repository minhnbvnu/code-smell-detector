function titleChange(evt)
        {
            this.model.update(new model.SetTitle(evt.target.value));
            evt.target.blur();
        }