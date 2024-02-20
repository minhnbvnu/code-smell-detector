function showAddToHomeScreen() {
    DotNet.invokeMethodAsync(blazorAssembly, blazorInstallMethod)
        .then(function () { }, function (er) { setTimeout(showAddToHomeScreen, 1000); });
}