expandControllerPLOTfunc = function($scope, $parse){

    $scope.select = function(site){
        console.log("select init with:", site)
        $scope.selected = site;
        $scope.detailName=$scope.selected.label2;
        for (var i = 0; i < $scope.werteALL.length; i++) {
            $scope.werteALL[i].plot = false;
        };
        for (var i = 0; i < $scope.selected.proben.length; i++) {
            $scope.selected.proben[i].plot = true;
        };

        var werteXY = [];
        var werteSCATTER=[{key: 'Marine', values:[]},{key: 'Indicator', values:[]},{key: 'Terrestrial', values:[]}];
        
        for (var i = 0; i < $scope.selected.proben.length; i++) {
            
            // evtl noch modern -> 0!
            if ($scope.selected.proben[i].age==="Modern" && $scope.selected.proben[i].age < 150000) {
                // find string "modern" and replace with value 0
                var temp = 0;
            // } else if ($scope.selected.proben[i].age==="n/a") {
            //      // if no corrected age [age] is given, fall back to uncorrected age [C_04]
            //     var temp = parseFloat($scope.selected.proben[i].C_04);
            } else {
                 // for all other cases just use [age]
                var temp = parseFloat($scope.selected.proben[i].age);
            }

            // werteSCATTER[$scope.selected.proben[i].type=="-1" ? 0 : 1]

            if ($scope.selected.proben[i].type=="-1") {
                werteSCATTER[0].values.push({
                  x: temp, 
                  y: parseFloat($scope.selected.proben[i].elevation),
                  xMin: $scope.selected.proben[i].ageErrorMinus,
                  xMax: $scope.selected.proben[i].ageErrorPlus,
                  yMin: $scope.selected.proben[i].sElevationErrorMinus,
                  yMax: $scope.selected.proben[i].sElevationErrorPlus,
                  size: 5, 
                  shape: "triangle-up",
                  label: $scope.selected.proben[i].label,
                  reference: $scope.selected.proben[i].reference,
                  plotmX1: parseFloat($scope.proben[i].C_06), // already given as interval on x -> no conversion needed
                  plotmX2: parseFloat($scope.proben[i].C_05),
                  plotmY1: parseFloat($scope.proben[i].D3_14), // distinguish marker type -> 
                  plotmY2: parseFloat($scope.proben[i].D3_13) // I: [y1=p-err, y2=p+err]; M: [y1=p, y2=p+2err]; T: [y1=p-2err, y2=p]
                });
                
              } else if ($scope.selected.proben[i].type=="0") {
                werteSCATTER[1].values.push({
                  x: temp, 
                  y: parseFloat($scope.selected.proben[i].elevation),
                  xMin: $scope.selected.proben[i].ageErrorMinus,
                  xMax: $scope.selected.proben[i].ageErrorPlus,
                  yMin: $scope.selected.proben[i].sElevationErrorMinus,
                  yMax: $scope.selected.proben[i].sElevationErrorPlus,
                  size: 5, 
                  shape: "circle",
                  label: $scope.selected.proben[i].label,
                  reference: $scope.selected.proben[i].reference,
                  plotmX1: parseFloat($scope.proben[i].C_06), // already given as interval on x -> no conversion needed
                  plotmX2: parseFloat($scope.proben[i].C_05),
                  plotmY1: parseFloat($scope.proben[i].D3_14), // distinguish marker type -> 
                  plotmY2: parseFloat($scope.proben[i].D3_13) // I: [y1=p-err, y2=p+err]; M: [y1=p, y2=p+2err]; T: [y1=p-2err, y2=p]
                });
              } else {
                werteSCATTER[2].values.push({
                  x: temp, 
                  y: parseFloat($scope.selected.proben[i].elevation),
                  xMin: $scope.selected.proben[i].ageErrorMinus,
                  xMax: $scope.selected.proben[i].ageErrorPlus,
                  yMin: $scope.selected.proben[i].sElevationErrorMinus,
                  yMax: $scope.selected.proben[i].sElevationErrorPlus,
                  size: 5, 
                  shape: "triangle-down",
                  label: $scope.selected.proben[i].label,
                  reference: $scope.selected.proben[i].reference,
                  plotmDx: parseFloat($scope.proben[i].C_03),
                  plotmX1: parseFloat($scope.proben[i].C_06), // already given as interval on x -> no conversion needed
                  plotmX2: parseFloat($scope.proben[i].C_05),
                  plotmY1: parseFloat($scope.proben[i].D3_14), // distinguish marker type -> 
                  plotmY2: parseFloat($scope.proben[i].D3_13) // I: [y1=p-err, y2=p+err]; M: [y1=p, y2=p+2err]; T: [y1=p-2err, y2=p]
                });
              }
              
        };

        // Calculate [Min Max] for svg extents! |--> draw axis
            // ondrag handle -> move viewBox? or not?


        $scope.werteSCATTER=werteSCATTER;
        console.log("select results in: ", $scope.werteSCATTER);
    }; //end of select()
    
    
  

};
