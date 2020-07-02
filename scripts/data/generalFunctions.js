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
    /*Group by chosen attribute [attr & sortierung = same String, but case sensisitive]*/
    $scope.groupBy = function( attribute ) {
        let sortierung = ''
        if ($scope.sortierung2 == "None"){
        } else{
            sortierung = attribute[0].toUpperCase()+attribute.slice(1);
        }
        console.log("->",attribute, " - ",sortierung, " - ", $scope.sortCase)

        $scope.sortierung=sortierung;
        $scope.detailName='';
       

        // First, reset the groups.
        $scope.groups = [];
        // Now, sort the collection of entry on the grouping-property. This just makes it easier to split the collection.
        sortOn( $scope.werteALL, attribute );
        // determine which group we are currently in.
        var groupValue = "_INVALID_GROUP_VALUE_";
        // As we loop over each entry, add it to the current group - we'll create a NEW group every time we come across a new attribute value.
        for ( var i = 0 ; i < $scope.werteALL.length ; i++ ) {
            $scope.werteALL[i].plot=false;
            var entry = $scope.werteALL[ i ];
            // Should a new group be created?
            if ( entry[ attribute ] !== groupValue ) {
                $scope.labelname =nachSchlagen(entry[attribute],sortierung);
              
                if (attribute=='None') {
                    var groupLabel="All Samples";
                    $scope.labelname="All Samples";
                } else {
                    var groupLabel=entry[ attribute ];
                }
                var group = {
                    label: groupLabel,
                    label2: $scope.labelname,
                    proben: []
                };
                groupValue = group.label;
                $scope.groups.push( group );
            }
            // Add the entry to the currently active
            // grouping.
            group.proben.push( entry );
        }

       

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
        tabelle = {};
        
   

        // execute
        if (category==='Region') {

            for ( var i = 0 ; i < $scope.dictREGION.length ; i++ ) {
                if (isNaN(postKey)){
                    var Bezeichnung=postKey;
                }else if ($scope.dictREGION[i].Key == postKey){
                    var Bezeichnung=$scope.dictREGION[i].fullName;
                } else if (postKey === ""){
                    var Bezeichnung="undefined";
                }
            };
        


            return Bezeichnung;

        } else if (category==='Dating') {
            for ( var i = 0 ; i < $scope.dictDATING.length ; i++ ) {
                if (isNaN(postKey)){
                    var Bezeichnung=postKey;
                }else if ($scope.dictDATING[i].Key == postKey){
                    var Bezeichnung=$scope.dictDATING[i].fullName;
                }else if (postKey === ""){
                    var Bezeichnung="undefined";
                }
            };


            return Bezeichnung;

        } else if(category==='Type'){
            for ( var i = 0 ; i < $scope.dictTYPE.length ; i++ ) {
                if ($scope.dictTYPE[i].Key == postKey){
                    var Bezeichnung=$scope.dictTYPE[i].fullName;
                } else if (postKey === ""){
                    var Bezeichnung="undefined";
                }
            };

            return Bezeichnung;
        } else if(category==='primaryType'){
            for ( var i = 0 ; i < $scope.dictPRIMARY.length ; i++ ) {
                if ($scope.dictPRIMARY[i].Key == postKey){
                    var Bezeichnung=$scope.dictPRIMARY[i].fullName;
                } else if (postKey === ""){
                    var Bezeichnung="undefined";
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

  
    $scope.allSelected = false;
    $scope.selectAll = function(){
        /**FIND SOLUTION TO SELECT ALL NOT INVERT WHEN ALREADY SELECTED */
        $scope.toggleSelect = false;
        for (var i = 0; i < $scope.werteALL.length; i++) {
            var item = $scope.werteALL[i];
            if ($scope.werteALL[i].plot == true){
                if ($scope.allSelected == false){
                    $scope.werteALL[i].export = true;
                } else if ($scope.allSelected = true){
                    $scope.werteALL[i].export = false;
                }
            }
        };
    $scope.allSelected=!$scope.allSelected;
};

$scope.selectWithinGroup = function(site){
    for (var i = 0; i < site.proben.length; i++) {
        const result3 = $scope.werteALL.findIndex( sample => sample.xUID === site.proben[i].xUID );
        $scope.werteALL[result3].export = true;
    }
}

// custom class change for plot markers if export = true
$scope.markerClass = "plotMarker";


$scope.exportLength = function(){
       let werteEND =  $q.werteALL;
        $scope.werteENDEXP =  werteEND.filter(function(item){
           return item.export;
       }).length;
        return $scope.werteENDEXP;
    };

    myApp.filter('objLength', function() { 
        return function(object) { 
         return object ? Object.keys(object).length : "";
        } 
       });


} //endof expand