function updateInstalledPackage(updatedPackage) {
   var packageIndex = installedPackages.findIndex(function(element) { 
      return (element.packageName === updatedPackage.packageName); 
   });

   if (packageIndex < 0) {
      packageIndex = installedPackages.length;
      installedPackages.push(updatedPackage);
   } else {
      installedPackages[packageIndex] = updatedPackage;
   }

   fs.writeFileSync(installedPackagesDataFileName, JSON.stringify(installedPackages));
}