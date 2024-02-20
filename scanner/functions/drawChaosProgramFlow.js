function drawChaosProgramFlow() {
    var chaosProgram = "";
    chaosProgram = $('#chaosProgramTextArea').val();

    var oReq = new XMLHttpRequest();
    oReq.open("POST", k8s_url + "/chaos/programs/json-flow", true);

    oReq.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            if (isJsonString(this.responseText)){
                var flow = JSON.parse(this.responseText);
                var flow_html = "";
                let i = 0;
                var times = "";
                $('#chaosProgramFlow').html("");

                while (i < flow["experiments"].length) {
                    if (flow["experiments"][i]["loop"] == 1){
                        times = "once";
                    }
                    else if (flow["experiments"][i]["loop"] == 2) {
                        times = "twice"
                    }
                    else {
                        times = flow["experiments"][i]["loop"] + " times"
                    }
                    console.log(flow_html);
                    if (current_color_mode == "light") {
                        flow_html = flow_html + '<div class="row"><div class="alert alert-light alert-kinv" id="' +  random_code + Math.floor(Math.random() * 9999) +'" role="alert" style="border-color: #000000; border-width: 1.5px;">Do ' + flow["experiments"][i]["name"] + ' ' + times + '</div></div>';
                    }
                    else {
                        flow_html = flow_html + '<div class="row"><div class="alert alert-light alert-kinv" id="' +  random_code + Math.floor(Math.random() * 9999) +'" role="alert" style="border-color: #ffffff; color: #1ed931; background-color: #0a0a0a; border-width: 1.5px;">Do ' + flow["experiments"][i]["name"] + ' ' + times + '</div></div>';
                    }
                    search_job = codename + ":" + flow["experiments"][i]["name"]

                    flow_html = flow_html + '<img src="images/down-arrow.png" width="30" height="30" style="margin-bottom: 2%;">';

                    //console.log("Search " + search_job);
                    for (let [key, value] of chaos_jobs_status) {
                        if (key.search(search_job) != -1 ) {
                            if (current_color_mode == "light") {
                                flow_html = flow_html + '<div class="row"><div class="alert alert-light alert-kinv" id="' +  random_code + Math.floor(Math.random() * 9999) +'" role="alert" style="border-color: #000000; border-width: 1.5px;">[' + key.split(":")[2] + '] Status: ' + value + '</div></div>';
                            } else {
                                flow_html = flow_html + '<div class="row"><div class="alert alert-light alert-kinv" id="' +  random_code + Math.floor(Math.random() * 9999) +'" role="alert" style="border-color: #ffffff; color: #1ed931; background-color: #0a0a0a; border-width: 1.5px;">[' + key.split(":")[2] + '] Status: ' + value + '</div></div>';
                            }
                        }
                    }
                    i++;
                }
                $('#chaosProgramFlow').html(flow_html);
            }
            else {
                $('#chaosProgramFlow').html(this.responseText);  
            }
        }
    };;

    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.send(chaosProgram);
}