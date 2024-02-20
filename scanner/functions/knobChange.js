function knobChange(value)
        {
            editor.model.update(new model.SetParam(
                id,
                'value',
                value
            ));
        }