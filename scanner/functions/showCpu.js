function showCpu(){
        var history = {
            labels : (function(){for(var i=0,labels=[];i<ponits_num;labels.push(''),i++);return labels;})(),
            datasets : [
                {
                    fillColor : "rgba(220,220,220,0.5)",
                    data : cpu_history.total
                },
                {
                    fillColor : "rgba(90,140,255,0.5)",
                    data : cpu_history.kernel
                },
                {
                    fillColor : "rgba(255,90,90,0.5)",
                    data : cpu_history.user
                }
            ]
        };

        var now = [
            {
                value: cpu_history.total[ponits_num-1],
                color:"rgba(220,220,220,0.7)"
            },
            {
                value : 100-cpu_history.total[ponits_num-1],
                color : "rgba(220,220,220,0.3)"
            }            
        ];
        var his_ctx = document.getElementById('cpu_history').getContext("2d");
        var now_ctx = document.getElementById("cpu_total").getContext("2d");
        if(!cpu_chart_line || !cpu_chart_pie){
            cpu_chart_line = new Chart(his_ctx);
            cpu_chart_pie = new Chart(now_ctx);
        }
        cpu_chart_line.Line(history, {scaleFontSize:4,pointDot:false,animation:false});
        cpu_chart_pie.Pie(now, {segmentShowStroke:false,animation:false});
    }