function add_email_yaml_template() {
var template = "\
to: \n\
cc: \n\
from_address: \n\
sender: \n\
reply_to: \n\
date: \n\
subject: \n\
message_id: \n\
x_mailer: \n\
helo: \n\
originating_ip: \n\
x_originating_ip: \n\
raw_header: \n\
raw_body: ";
$("#id_yaml_data").val(template);
}