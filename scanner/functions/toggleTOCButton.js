function toggleTOCButton(e){
        if (window.location.pathname == "/cl-cookbook/"){
            document.getElementById("toc-btn").style.display = "none";
        }else if ($(document).width() <= 576){
            document.getElementById("toc-btn").style.display = "block";
        }else{
            document.getElementById("toc-btn").style.display = "none";
        }
    }