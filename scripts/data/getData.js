   expandControllerGET = function($scope, $http, $q, $sce, $parse, nachSchlagen){

       $scope.getProben = function(){
           $http({
               method: "GET",
               url: "scripts/data/datenHolen.php"
            }).then(function mySuccess(response){
                $scope.proben = [];
                $scope.proben=response.data;
                // console.log(response);
                // console.log("Daten geladen", $scope.proben)
                // console.log("Daten geladen", $scope.proben.length)
            }, function myError(response){
                console.log("Daten NICHT geladen", response);
            }).then(function Konvertieren(){
                // Generate Array from loaded Data 
                
                var  werteALL =[];
                // console.log($scope.proben, $scope.proben.length);
                
                // Iterate through list of samples and generate the necessary array
                for (var i = 0; i < $scope.proben.length; i++){
                    // console.log("iterated stuff:", $scope.proben[i], i )
                    // Replace String 'modern' with value zero (plotting)
                    // var age_temp = $scope.proben[i].C_02 == "Modern" ? 0 : parseFloat($scope.proben[i].C_02);

                    /*replace wrong entries */
                    // find records where C_02='modern' and replace with float 0;
                    if ($scope.proben[i].C_02 == "Modern") {
                        var age_temp = 0;
                    } else {
                        var age_temp = parseFloat($scope.proben[i].C_02);
                    }
                    // Get RSL for SL indicators and Sample Elevation for MArine & Terrestrial Limiting 
                    if ($scope.proben[i].D5_01 === 0) {
                        var elevation_temp = parseFloat($scope.proben[i].D7_01);
                        let elevation_errorPlus = parseFloat($scope.proben[i].D7_02);
                        let elevation_errorMinus = parseFloat($scope.proben[i].D7_03);
                    } else {
                        var elevation_temp = parseFloat($scope.proben[i].D3_11);
                        let elevation_errorPlus = parseFloat($scope.proben[i].D3_13);
                        let elevation_errorMinus = parseFloat($scope.proben[i].D3_14);
                    }
                    // replace wrong coordinates
                    if ($scope.proben[i].B_02 == "Modern") {

                    } else {

                    }
                    // extract publication year from Reference
                    var regExpYear=/\(([^]+)\)/;
                    var regExpYear2=/[0-9]+/;

                    var match1 = parseInt(regExpYear2.exec($scope.proben[i].A_02)[0]);
                    var match2 = $scope.proben[i].A_02.match(regExpYear);
                    // Push them into werteAll
                    werteALL.push({
                        xUID: parseInt($scope.proben[i].A_00),
                        label: $scope.proben[i].A_01,
                        type: parseInt($scope.proben[i].D5_01),
                        type_string: nachSchlagen(parseInt($scope.proben[i].D5_01), 'Type'),
                        age: age_temp,
                        elevation: elevation_temp,
                        lat: parseFloat($scope.proben[i].B_03),
                        lng: parseFloat($scope.proben[i].B_04),
                        reference: $scope.proben[i].A_02.trim(),
                        publicationYear: match1,
                        region: $scope.proben[i].B_01,
                        subregion: $scope.proben[i].B_02,
                        dating: $scope.proben[i].C_01,
                        feature: nachSchlagen(parseInt($scope.proben[i].D5_02),'primaryType'),
                        rejected: Boolean(parseInt($scope.proben[i].E_01)),
                        ageErrorPlus: parseFloat($scope.proben[i].C_05),
                        ageErrorMinus: parseFloat($scope.proben[i].C_06),
                        ageError: parseFloat($scope.proben[i].C_03),
                        sElevationErrorPlus: parseFloat($scope.proben[i].D3_13),
                        sElevationErrorMinus: parseFloat($scope.proben[i].D3_14),
                        export: false,
                        map: false,
                        plot: false,
                        myFocus: false,
                        plotmDx: parseFloat($scope.proben[i].C_03),
                        plotmX1: parseFloat($scope.proben[i].C_06), 
                        plotmX2: parseFloat($scope.proben[i].C_05),
                        plotmY1: parseFloat($scope.proben[i].D3_14), // distinguish marker type -> 
                        plotmY2: parseFloat($scope.proben[i].D3_13) // I: [y1=p-err, y2=p+err]; M: [y1=p, y2=p+2err]; T: [y1=p-2err, y2=p]

                    })
                };
                $scope.werteALL=werteALL;
                // console.log("end", $scope.werteALL);
                $scope.groupBy( 'region', 'Region' );

            })
        }; //end of $scope.getProben

        // $scope.getFullRecords=function(selection){
        //     $http({
        //         method: "POST",
        //         data: selection,
        //         url: "scripts/data/datenExportieren.php"
        //     }).then(function mySuccess(response){
        //         $scope.probenExport = response.data;
        //         console.log("Daten fuer Export geladen...",response.data);
        //     }, function myError(response){
        //         console.log("Daten NICHT geladen!",response);

        //     });
        // }
        
    } //end of expand
