function add_problem(what)
{
	problems_span=e("openwebrx-problems");
	for(var i=0;i<problems_span.children.length;i++) if(problems_span.children[i].innerHTML==what) return;
	new_span = document.createElement("span");
	new_span.innerHTML=what;
	problems_span.appendChild(new_span);
	window.setTimeout(function(ps,ns) {  ps.removeChild(ns); }, 1000,problems_span,new_span);
}