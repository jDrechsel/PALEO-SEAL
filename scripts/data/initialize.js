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
    // /* MAP & PLOT: initial settings and set up  watch options */
    // angular.extend($scope, {
    //     watchOptions:{
    //     paths: {
    //         individual: { type: 'watch'}, //this keeps indigest errors from happening.... (deep by default) // Funktioniert nicht :(
    //         type: 'watchCollection'
    //     }
    //     },
    //     mapData: {
    //         lat: 53.109015,
    //         lng: 8.849977,
    //         zoom: 18
    //     },
    //     markers: {
    //     beiDir: {
    //         lat: 53.109015,
    //         lng: 8.849977,
    //         focus: true,
    //         message: "SLCC @ MARUM"
    //     }
    //     },
    //     bounds: {},
    //     events: {},
    //     paths: {}
    // });
}; //End of expander