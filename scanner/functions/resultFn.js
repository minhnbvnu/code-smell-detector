function resultFn(result) {
    console.log(result);
    document.getElementById("results").innerHTML += JSON.stringify(result, null, 4) + "<br/>";
}