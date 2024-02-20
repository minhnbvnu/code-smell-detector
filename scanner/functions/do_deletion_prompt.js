function do_deletion_prompt(message, force_prompt=false) {
    if (userWhoami.has_deletion_confirmation || force_prompt) {
            return new Promise((resolve, reject) => {
                swal({
                    title: "Are you sure?",
                    text: message,
                    icon: "warning",
                    buttons: {
                        cancel: {
                            text: "Cancel",
                            value: false,
                            visible: true,
                            closeModal: true
                        },
                        confirm: {
                           text: "Confirm",
                           value: true
                        }
                    },
                    dangerMode: true
                })
                .then((willDelete) => {
                    resolve(willDelete);
                })
                .catch((error) => {
                    reject(error);
                });
            });
    } else {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }
}