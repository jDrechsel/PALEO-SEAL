   expandControllerGET = function($scope, $http, $q, $sce, $parse, nachSchlagen){

       $scope.getProben = function(){
           $http({
               method: "GET",
               url: "scripts/data/datenHolen.php"
            }).then(function mySuccess(response){
                $scope.proben = [];
                $scope.proben=response.data;
            }, function myError(response){
                console.log("Daten NICHT geladen", response);
            }).then(function Konvertieren(){
                // Generate Array from loaded Data 
                
                var  werteALL =[];
                
                // Iterate through list of samples and generate array
                for (var i = 0; i < $scope.proben.length; i++){

                    /*replace wrong entries */
                    // find records where C_02='modern' and replace with float 0;
                    if ($scope.proben[i].C_02 == "Modern") {
                        var age_temp = 0;
                    } else {
                        var age_temp = parseFloat($scope.proben[i].C_02);
                    }
                    // Get RSL(D7_01) for SL indicators and Sample Elevation(D3_11) for Marine & Terrestrial Limiting 
                    if ($scope.proben[i].D5_01 == 0) {
                        var elevation_temp = parseFloat($scope.proben[i].D7_01);
                        var elevation_errorPlus = parseFloat($scope.proben[i].D7_02);
                        var elevation_errorMinus = parseFloat($scope.proben[i].D7_03);
                    } else {
                        var elevation_temp = parseFloat($scope.proben[i].D3_11);
                        var elevation_errorPlus = parseFloat($scope.proben[i].D3_13);
                        var elevation_errorMinus = parseFloat($scope.proben[i].D3_14);
                    }

                    // extract publication year from Reference via RegEx
                    var regExpYear=/[0-9]+/;
                    var match1 = parseInt(regExpYear.exec($scope.proben[i].A_02)[0]);

                    // Push entry into werteAll
                    if ($scope.proben[i].E_01 == true){
                        // don't convert rejected entries
                        } else {
                            werteALL.push({
                                xUID: parseInt($scope.proben[i].A_00),
                                label: $scope.proben[i].A_01,
                                type: parseInt($scope.proben[i].D5_01),
                                type_string: nachSchlagen(parseInt($scope.proben[i].D5_01), 'Type'),
                                age: age_temp,
                                elevation: elevation_temp,
                                elevationMinus: elevation_errorMinus,
                                elevationPlus: elevation_errorPlus,
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
                                export: false,
                                map: false,
                                plot: false,
                                myFocus: false,
                            
                            })
                        }
                };
                $scope.werteALL=werteALL;

                // initialize with Region selected
                $scope.groupBy( 'region');

            })
        }; //end of $scope.getProben

    } //end of expand
