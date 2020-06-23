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

       

        // Calculate [Min Max] for svg extents! |--> draw axis
            // ondrag handle -> move viewBox? or not?


        console.log("select results in: ", $scope.werteSCATTER);

    }; //end of select()
    
    
  

};
