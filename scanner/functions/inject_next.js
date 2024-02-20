function inject_next () {
        if (t_index < t_count) {
            inject_a_page (targer_elements[t_index]);
            t_index++;
        }
    }