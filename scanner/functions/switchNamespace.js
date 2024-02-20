function switchNamespace() {
    if (namespaces_index < namespaces.length-1) {
        namespaces_index +=1 ;
    }
    else {
        namespaces_index = 0;
    }
    namespace = namespaces[namespaces_index];
    $('#currentGameNamespace').text(namespace);
    $('#alert_placeholder').replaceWith(alert_div + 'Latest action: Change target namespace to ' + namespace + '</div>');
    aliens = [];
    pods = [];
}