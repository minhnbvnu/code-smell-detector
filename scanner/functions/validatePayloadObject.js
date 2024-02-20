function validatePayloadObject (obj) {
        var
            task = validate(obj.task),
            delay = validateInt(obj.delay),
            repeats = validateInt(obj.repeats),
            duration = validateInt(obj.duration),
            steps = validateInt(obj.steps),
            repeat = validate(obj.repeat),
            color = validate(obj.color),
            channel = validateInt(obj.channel),
            index = validateInt(obj.index),
            row = validateArray(obj.row);

        if (typeof(task) !== 'undefined' && availableTasks.indexOf(task) === -1) {
            return "Task is invalid";
        }

        if (typeof(color) === 'undefined' && typeof(row) === 'undefined') {
            return "Color parameter is not set";
        }

        return { 'task': task, 'delay': delay, 'repeats': repeats, 'duration': duration, 'steps': steps,
            'repeat': repeat, 'color': color, 'channel': channel, 'index': index, 'row': row };
    }