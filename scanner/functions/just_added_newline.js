function just_added_newline() {
            var line = output_lines[output_lines.length - 1];
            return line.text.length === 0;
        }