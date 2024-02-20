function showMem(){
        var history = {
            labels : (function(){for(var i=0,labels=[];i<ponits_num;labels.push(''),i++);return labels;})(),
            datasets : [
                {
                    fillColor : "rgba(220,220,220,0.5)",
                    data : mem_history.used
                }
            ]
        };

        var now = [
            {
                value: mem_history.used[ponits_num-1],
                color:"rgba(220,220,220,0.7)"
            },
            {
                value : 100-mem_history.used[ponits_num-1],
                color : "rgba(220,220,220,0.3)"
            }            
        ];
        var his_ctx = document.getElementById('mem_history').getContext("2d");
        var now_ctx = document.getElementById("mem_total").getContext("2d");
        if(!mem_chart_line || !mem_chart_pie){
            mem_chart_line = new Chart(his_ctx);
            mem_chart_pie = new Chart(now_ctx);
        }
        mem_chart_line.Line(history, {scaleFontSize:4,pointDot:false,animation:false});
        mem_chart_pie.Pie(now, {segmentShowStroke:false,animation:false});
    }