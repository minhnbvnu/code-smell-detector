function drawGraphTC(event) {

    $scope.eid = event.event.Event.Id;

    $scope.alarm_images = [];

    data = {
      labels: [],
      datasets: [{
          label: 'Score',
          fill: true,
          backgroundColor: 'rgba(89, 171, 227, 1.0)',
          borderColor: 'rgba(52, 152, 219, 1.0)',
          borderCapStyle: 'butt',
          borderJoinStyle: 'miter',
          pointBorderColor: "#e74c3c",
          pointBackgroundColor: "#e74c3c",

          pointHoverRadius: 10,
          pointHoverBackgroundColor: "rgba(249, 105, 14,1.0)",
          pointHoverBorderWidth: 1,
          tension: 0.1,

          data: [],
          frames: []
        },

      ]
    };

    onlyalarm_data = {
      labels: [],
      datasets: [{
          label: 'Score',
          backgroundColor: 'rgba(52, 152, 219, 1.0)',
          borderColor: 'rgba(52, 152, 219, 1.0)',
          hoverBackgroundColor: 'rgba(249, 105, 14,1.0)',
          hoverBorderColor: 'rgba(249, 105, 14,1.0)',
          data: [],
          frames: []
        },

      ]
    };

    // Chart.js Options
    options = {
      legend: false,
      scales: {
        yAxes: [{
          ticks: {
            // beginAtZero:true,
            min: -1,
          },
        }],
        xAxes: [{
          display: false
        }]
      },

      responsive: true,
      scaleBeginAtZero: true,
      scaleShowGridLines: true,
      scaleGridLineColor: "rgba(0,0,0,.05)",
      scaleGridLineWidth: 1,

      hover: {
        mode: 'single',
        onHover: function (obj) {
          if (obj.length > 0)
            tapOrHover(obj[0]._index);
        }
      },

      //String - A legend template
      legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };

    $scope.graphWidth = event.event.Frame.length * 10;
    if ($scope.graphWidth < $rootScope.devWidth)
      $scope.graphWidth = $rootScope.devWidth;

    // NVR.log ("Changing graph width to " + $scope.graphWidth);

    for (var i = 0; i < event.event.Frame.length; i++) {

      data.labels.push(event.event.Frame[i].TimeStamp);
      //data.labels.push(' ');
      data.datasets[0].data.push(event.event.Frame[i].Score);
      data.datasets[0].frames.push({
        x: event.event.Frame[i].TimeStamp,
        y: event.event.Frame[i].Score,
        eid: event.event.Event.Id,
        fid: event.event.Frame[i].FrameId,
        id: event.event.Frame[i].Id,
        //group:i,
        
        score: event.event.Frame[i].Score,
        fname: padToN(event.event.Frame[i].FrameId, eventImageDigits) + "-capture.jpg",

      });

      if (event.event.Frame[i].Type == "Alarm") {

        onlyalarm_data.labels.push(event.event.Frame[i].TimeStamp);
        //data.labels.push(' ');
        onlyalarm_data.datasets[0].data.push(event.event.Frame[i].Score);
        onlyalarm_data.datasets[0].frames.push({
          x: event.event.Frame[i].TimeStamp,
          y: event.event.Frame[i].Score,
          eid: event.event.Event.Id,
          fid: event.event.Frame[i].FrameId,
          //group:i,
         
          score: event.event.Frame[i].Score,
          fname: padToN(event.event.Frame[i].FrameId, eventImageDigits) + "-capture.jpg",
          id: event.event.Frame[i].Id,

        });
      }

    }

    $scope.dataReady = true;

    cv = document.getElementById("tcchart");
    ctx = cv.getContext("2d");

    if (NVR.getLogin().timelineModalGraphType == $translate.instant('kGraphAll')) {
      btype = 'line';
      current_data = data;
    } else {
      btype = 'bar';
      current_data = onlyalarm_data;
    }
    $timeout(function () {
      tcGraph = new Chart(ctx, {
        type: btype,
        data: current_data,
        options: options
      });
    });

    cv.onclick = function (e) {
      var b = tcGraph.getElementAtEvent(e);
      if (b.length > 0) {
        tapOrHover(b[0]._index);
      }
    };
  }