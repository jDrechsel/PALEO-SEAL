myApp.controller("myController", ["$scope", "$filter", "$http", "$q", "$sce","$parse", "$mdSidenav","$mdDialog","leafletData", function ($scope, $filter, $http, $q, $sce, $parse, $mdSidenav, $mdDialog, leafletData){
$scope.message = "myController loaded...";


// Load custom Expansions (&directives)
// Preloading requisites
expandControllerINIT($scope, $http, $mdSidenav);
expandControllerINTERFACE($scope, $mdSidenav, $mdDialog, $parse, $http, $filter);
// Expand controller for data operations ( Functions, groupBy(), sortOn(),...)
expandControllerDATA($scope, $mdSidenav, $q);
// Connect to DB and get Data 
expandControllerGET($scope, $http, $q, $sce, $parse, nachSchlagen);
// Expand controller for map operations (generate markers based on selection in Data)
expandControllerMAP($scope);
// Expand controller for map selection functions
expandControllerMAPfunc($scope,$filter, leafletData, $mdDialog);

// expandControllerPLOT($scope);
expandControllerPLOTfunc($scope, $parse);

expandControllerPLOTsvgOPT($scope, $parse);
expandControllerPLOTsvg($scope, $parse);

// Console Disclaimer
console.log("%cPALEO SEAL - 1.0"," font-family:sans-serif; font-size: 20px; font-weight: bold");
console.log("%cThe Console is intended for developer use only! "," font-family:sans-serif; font-size: 14px; font-weight: bold");
console.log("%cPALEO-SEAL was developed by Jan Drechsel, M.Sc. (IT consultant), under scientific supervision of Dr. Alessio Rovere (MARUM, University of Bremen). "," font-family:sans-serif; font-size: 12px;");
console.log("%cIf you use the data in PALEO-SEAL, please remember to cite the original authors, and give credit to HOLSEA by citing Khan et al., 2019. Acknowledgments and citations of this code are always welcome, as are suggestions for improvement."," font-family:sans-serif; font-size: 12px;");
console.log("%c2020 jDrechsel, M.Sc. "," font-family:sans-serif; font-size: 14px; font-weight: bold");

// Load data array 
$scope.getProben();

/*Debug function: Check if data exists */
// setTimeout(function(){
//     console.log("fetched wA", $scope.werteALL)
//     console.log("fetched p", $scope.proben)
//     console.log("dicts: (delay)", $scope.dictTYPE, $scope.dictREGION, $scope.dictDATING);

//     console.log($scope.dictDATING[2].Key);
//     console.log("dict Testing : ", $scope.dictTYPE[0].Name);


// }, 1000);


}]);