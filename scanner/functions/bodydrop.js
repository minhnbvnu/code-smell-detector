function bodydrop(e) {
            if (e.dataTransfer.files && e.dataTransfer.files.length ){
                e.stopPropagation();
                e.preventDefault();
            }
        }