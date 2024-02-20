function insert_text_on_position(destination, position, text_to_be_inserted) {
        const result_text = [];
        result_text.push(destination.slice(0, position));
        result_text.push(text_to_be_inserted);
        result_text.push(destination.slice(position));
        return result_text.join("");
    }