function getDropImage(e){
        return  e.dataTransfer && e.dataTransfer.files ? e.dataTransfer.files:null;
    }