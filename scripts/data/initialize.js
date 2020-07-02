expandControllerINIT = function($scope, $http, $mdSidenav){
    /*Pre-load dictionaries */
    tabelle = {};
    tabelleREGION="data/lookups/regionCodes_lookup.json";
    tabelleDATING="data/lookups/datingMethod_lookup.json";
    tabelleTYPE="data/lookups/IndicatorType_lookup.json";
    tabellePRIMARY="data/lookups/primaryIndicatorTypes_lookup.json";

    $http({
        method: 'GET',
        url: tabelleTYPE
    }).then(function mySuccess(response){
        $scope.dictTYPE = response.data;
    });

    $http({
        method: 'GET',
        url: tabelleREGION
    }).then(function mySuccess(response){
        $scope.dictREGION = response.data;
    });

    $http({
        method: 'GET',
        url: tabelleDATING
    }).then(function mySuccess(response){
        $scope.dictDATING = response.data;
    })
    
    $http({
        method: 'GET',
        url: tabellePRIMARY
    }).then(function mySuccess(response){
        $scope.dictPRIMARY = response.data;
    })
    
}; //End of expander