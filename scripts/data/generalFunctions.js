expandControllerDATA = function($scope, $mdSidenav, $q){

    /*Sort for faster splitting of the collection */   
    function sortOn( collection, name ) {
        collection.sort(
            function( a, b ) {
                if ( a[ name ] <= b[ name ] ) {
                    return( -1 );
                }
                return( 1 );
            }
        );
    };
    /*Group by chosen attribute */
    $scope.groupBy = function( attribute, sortierung ) {
        // console.log("INput for groupBy():", $scope.proben);
        // console.log("INput for groupBy():", attribute);
        // console.log("INput for groupBy():", sortierung);
        $scope.sortierung=sortierung;
        $scope.detailName='';
        // console.log("INput for groupBy()$:", $scope.sortierung);

        // First, reset the groups.
        $scope.groups = [];
        // Now, sort the collection of friend on the
        // grouping-property. This just makes it easier
        // to split the collection.
        sortOn( $scope.werteALL, attribute );
        // I determine which group we are currently in.
        var groupValue = "_INVALID_GROUP_VALUE_";
        // As we loop over each friend, add it to the
        // current group - we'll create a NEW group every
        // time we come across a new attribute value.
        for ( var i = 0 ; i < $scope.werteALL.length ; i++ ) {
            $scope.werteALL[i].plot=false;
            var friend = $scope.werteALL[ i ];
            // Should we create a new group?
            if ( friend[ attribute ] !== groupValue ) {
                // $scope.labelname =nachSchlagen (friend[attribute],sortierung);
                $scope.labelname =nachSchlagen(friend[attribute],sortierung);
                // console.log("labelName: ", $scope.labelname);
                
                // console.log("attribute:", attribute);
                // console.log("friend[attribute]:", friend[attribute]);
                // console.log("$scope.sortierung: ", $scope.sortierung);
                // console.log("sortierung: ", sortierung);
                // console.log("labelname:", $scope.labelname);
                if (sortierung=='None') {
                    var groupLabel="All Samples";
                } else {
                    var groupLabel=friend[ attribute ];
                }
                var group = {
                    label: groupLabel,
                    label2: $scope.labelname,
                    proben: []
                };
                groupValue = group.label;
                $scope.groups.push( group );
            }
            // Add the friend to the currently active
            // grouping.
            group.proben.push( friend );
        }

        console.log('>>> [2] Groups');
        console.log('>>> $scope.sortierung2', $scope.sortierung2);
        console.log('attribute -->', attribute, "------ Unique classes:", $scope.groups.length);
        console.log("sortierung", sortierung);
        console.log('Groups -----> $s.groups', $scope.groups);


    };
    /* Lookup category names if necessary */
    // function nachSchlagen(postKey,category) {
    window.nachSchlagen=function(postKey,category) {
        // Function compares input number (postKey) with dictionary IDs and returns the full name stored in the respective /tables/*_lookup.json
        // 
            // possible data sources:
            //  tables/datingMethod_lookup.json
            //  tables/primaryIndicatorTypes_lookup.json
            //  tables/regionCodes_lookup.json
        // clear data
        //Bezeichnung = null;
        // Setup and init
        // console.log("initialize nachSchlagen with:", postKey, "-", category);
        tabelle = {};
        
        
        // use console to check value of category
        //console.log(category);


        // execute
        if (category==='Region') {

            for ( var i = 0 ; i < $scope.dictREGION.length ; i++ ) {
                // console.log($scope.dictREGION[i].fullName);
                if (isNaN(postKey)){
                    var Bezeichnung="undefined";
                }else if ($scope.dictREGION[i].Key == postKey){
                    var Bezeichnung=$scope.dictREGION[i].fullName;
                }
            };
        

            // Bezeichnung = $scope.dictTYPE[postKey];

            return Bezeichnung;

        } else if (category==='Dating') {
            for ( var i = 0 ; i < $scope.dictDATING.length ; i++ ) {
                // console.log($scope.dictDATING[i].fullName);
                if ($scope.dictDATING[i].Key == postKey){
                    var Bezeichnung=$scope.dictDATING[i].fullName;
                }
            };


            return Bezeichnung;

        } else if(category==='Type'){
            for ( var i = 0 ; i < $scope.dictTYPE.length ; i++ ) {
                // console.log($scope.dictTYPE[i].fullName);
                if ($scope.dictTYPE[i].Key == postKey){
                    var Bezeichnung=$scope.dictTYPE[i].fullName;
                }
            };

            return Bezeichnung;
        } else if(category==='primaryType'){
            for ( var i = 0 ; i < $scope.dictPRIMARY.length ; i++ ) {
                // console.log($scope.dictPRIMARY[i].fullName);
                if ($scope.dictPRIMARY[i].Key == postKey){
                    var Bezeichnung=$scope.dictPRIMARY[i].fullName;
                }
            };

            return Bezeichnung;
        }else if($scope.sortierung2==='None'){
            // show "All samples" when grouped by "none"
            Bezeichnung="All samples";
            return Bezeichnung;
        } else {
            // all other cases if not covered by precedent cases
            Bezeichnung=postKey;
            return Bezeichnung;
        }



    }; // ENDOF NACHSCHLAGEN()

    function passVal(dataExport){
        $.post("datenExportieren.php", {"list4export": dataExport});
    };
    $scope.allSelected = false;
    $scope.selectAll = function(){
        /**FIND SOLUTION TO SELECT ALL NOT INVERT WHEN ALREADY SELECTED */
        $scope.toggleSelect = false;
        for (var i = 0; i < $scope.werteALL.length; i++) {
            var item = $scope.werteALL[i];
            if ($scope.werteALL[i].plot == true){
                // $scope.werteALL[i].export!= $scope.werteALL[i].export;
                if ($scope.allSelected == false){
                    $scope.werteALL[i].export = true;
                } else if ($scope.allSelected = true){
                    $scope.werteALL[i].export = false;
                }
            }

            // if ($scope.werteALL[i].plot == true && $scope.werteALL[i].export == false){
            //     $scope.werteALL[i].export = true;
            // } else if ($scope.werteALL[i].plot == true && $scope.werteALL[i].export == true){

            // }
            // $scope.export[item.id] = true;
        };
    $scope.allSelected=!$scope.allSelected;
};

$scope.selectWithinGroup = function(site){
    // console.log("selectWG init with:", site )
    for (var i = 0; i < site.proben.length; i++) {
        // console.log("site.proben i : ", site.proben[i]);
        const result3 = $scope.werteALL.findIndex( sample => sample.xUID === site.proben[i].xUID );
        $scope.werteALL[result3].export = true;
    }
}

// custom class change for plot markers if export = true
$scope.markerClass = "plotMarker";

$scope.changeClass = function(){
    if ($scope.markerClass === "plotMarker"){
        $scope.markerClass = "plotMarkerSelected";
    } else {
        $scope.markerClass = "plotMarker";
    }

};

$scope.exportLength = function(){
    // return function(){
       let werteEND =  $q.werteALL;
       console.log("werteEND",werteEND);
        $scope.werteENDEXP =  werteEND.filter(function(item){
           return item.export;
       }).length;
    // }
     //.filter(function(item){
        //     return item.export;
        // }).length;
        return $scope.werteENDEXP;
    };
} //endof expand