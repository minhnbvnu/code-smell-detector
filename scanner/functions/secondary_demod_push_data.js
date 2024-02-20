function secondary_demod_push_data(x)
{
    x=Array.from(x).map((y)=>{
        var c=y.charCodeAt(0);
        if(y=="\r") return "&nbsp;";
        if(y=="\n") return "&nbsp;";
        //if(y=="\n") return "<br />";
        if(c<32||c>126) return "";
        if(y=="&") return "&amp;";
        if(y=="<") return "&lt;";
        if(y==">") return "&gt;";
        if(y==" ") return "&nbsp;";
        return y;
    }).join("");
    $("#openwebrx-cursor-blink").before("<span class=\"part\"><span class=\"subpart\">"+x+"</span></span>");
}