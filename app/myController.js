myApp.controller("myController", ["$scope", "$filter", "$http", "$q", "$sce","$parse", "$mdSidenav","$mdDialog","leafletData", function ($scope, $filter, $http, $q, $sce, $parse, $mdSidenav, $mdDialog, leafletData){
    // , $q, $http, $sce, $window, $compile, $interpolate, $parse, $interval, $mdDialog, $mdSidenav, $mdToast, $mdMenu, $timeout
$scope.message = "myController loaded...";


// Load custom Expansions (&directives)
// Preloading requisites
expandControllerINIT($scope, $http, $mdSidenav);
expandControllerINTERFACE($scope, $mdSidenav, $mdDialog, $parse, $http);
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

// create lookuptables


// Load data array 
$scope.getProben();

// $scope.drawBarChart();

setTimeout(function(){
    console.log("fetched wA", $scope.werteALL)
    console.log("fetched p", $scope.proben)
    console.log("dicts: (delay)", $scope.dictTYPE, $scope.dictREGION, $scope.dictDATING);

    console.log($scope.dictDATING[2].Key);
    console.log("dict Testing : ", $scope.dictTYPE[0].Name);


}, 1000);
}]);