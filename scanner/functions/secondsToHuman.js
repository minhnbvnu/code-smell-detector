function secondsToHuman(seconds)
{
    if (seconds<60) { var v=Math.floor(seconds); return v+' second'+((v>1)?'s':''); }
    if (seconds<60*60) { var v=Math.floor(seconds/60); return v+' minute'+((v>1)?'s':''); }
    if (seconds<60*60*24) { var v=Math.floor(seconds/(60*60)); return v+' hour'+((v>1)?'s':''); }
    // If less than 2 months, display in days:
    if (seconds<60*60*24*60) { var v=Math.floor(seconds/(60*60*24)); return v+' day'+((v>1)?'s':''); }
    var v=Math.floor(seconds/(60*60*24*30)); return v+' month'+((v>1)?'s':'');
}