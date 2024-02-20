function is_control_req(req) {
            var url = req.url.split('?')[0];
            return !support_port || url.split('/')[1] === '__zuul';
        }