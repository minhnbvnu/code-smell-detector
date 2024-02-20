function update_time() {
    $('#current_date').text((new Date()).toLocaleString().slice(0, 17));
}