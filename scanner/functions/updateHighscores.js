function updateHighscores(nickName,newScore,storageName){

    // test if functionality is available at all

    if (typeof(Storage) === "undefined") {
	console.log("html5 localStorage is not available on your device");
	return;
    }

    // test if there are already data in this localStorage 
    // and get them, if applicable 

    var scores =[];
    if(localStorage[storageName]){
	scores = JSON.parse(localStorage[storageName]);
    }

    // add new entry to scores array

    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1; if(month<10){month="0"+month;}
    var day=date.getDate(); if(day<10){day="0"+day;}
    var hours=date.getHours(); if(hours<10){hours="0"+hours;}
    var minutes=date.getMinutes(); if(minutes<10){minutes="0"+minutes;}
    var seconds=date.getSeconds(); if(seconds<10){seconds="0"+seconds;}

    var dateStr=year+"-"+month+"-"+day
	+" "+hours+":"+minutes+":"+seconds;

    scores.push({name:nickName,
		 score:newScore,
		 date:dateStr
		});

  //console.log("before sorting: scores=",scores);
  scores.sort(function(a,b){return a.score - b.score}); // !! a-b, not a>b
  //console.log("after sorting: scores=",scores);

    // save the updated highscore list and return string for html display 

    localStorage[storageName] = JSON.stringify(scores);
 

    var str_highScores="<h1> Game Finished!</h1> Your time is "
	+newScore+" Seconds"
	+"<h2>Highscore list:</h2>"
	+"<table border=\"0\" cellspacing=\"1\" cellpadding=\"3\">"
	//+"<tr><th> name</th><th>score [s]</th><th>time</th></tr>";
	+"<tr><th>rank</th><th> name</th><th>score [s]</th></tr>";

    //for(var i=0; i<scores.length; i++){
    for(var i=0; i<Math.min(scores.length,10); i++){
	console.log("name:",scores[i].name,
		    " score:",scores[i].score,
		    " date:",scores[i].date);
	str_highScores += "<tr>"
            + "<td>"+(i+1)+"</td>"
            + "<td>"+scores[i].name+"</td>"
	    + "<td>"+scores[i].score+"</td>"
	   // + "<td>"+scores[i].date+"</td>"
            +  "</tr>"
    }
  str_highScores += "</table>";
  console.log("updateHighscores: storageName=",storageName,
	      "\n localStorage[storageName]=", localStorage[storageName],
	      "\n localStorage=",localStorage);
  return str_highScores;
}