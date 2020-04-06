<!DOCTYPE html>
<html>

<?php require 'common/head.php'; ?>


<!-- BODY --------------------------------------------------->

<body ng-app="myApp" ng-controller="myCtrl">

<!-- NAVBAR --------------------------------------------------------------------->
<div>
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <div class="navbar-header">
	     	<a class="navbar-brand" href="#">
	      		<span><img src="img/fingerprint.svg" width="30" height="30" class="d-inline-block align-top" alt=""  color="#616161"></span>
	      		PALeo SEA LEVel INterface
	  		</a>
	    </div>
	    <ul class="nav navbar-nav">
	      <li><a href="#!">Intro</a></li>
	      <li><a href="#!ChartVIEW">Data Explorer</a></li>
	      <li><a href="#!Map">Map</a></li>
	      <li><a href="#!AddSample">Add Sample</a></li>
	      <!-- <li><a href="#!Login">Login</a></li> -->
	      <li><a href="#!PAGEabout">about</a></li>
	    </ul>
	  </div>
	</nav>
</div>

<!-- SHOW the PAGES ----------------------------------->
<div flex><div ng-view></div></div>


<!-- SCRIPT ------------S----S----S-------------------------------------------------------------------------------------------------->

<!-- SCRIPT -------------C-----C-----C----------------------------------------------------------------------------------------------->
<!-- SCRIPT --------------R------R------R-------------------------------------------------------------------------------------------->
<!-- SCRIPT ---------------I-------I-------I----------------------------------------------------------------------------------------->
<!-- SCRIPT ----------------P--------P--------P-------------------------------------------------------------------------------------->
<!-- SCRIPT -----------------T---------T---------T----------------------------------------------------------------------------------->

<script type="text/javascript">

	var app = angular.module('myApp', [ 'ngRoute',  'ngAnimate', 'ngMaterial', 'ngMessages', 'angular.filter', 'ui-leaflet', 'nvd3']);

	app.config(function($routeProvider) {
	    $routeProvider
	    .when("/", {
	        templateUrl : "common/pages/PAGE_INTRO.htm"
	    })
	    .when("/ChartVIEW", {
	        templateUrl : "common/pages/PAGE_EXPLORER.htm"
	    })
	    .when("/AddSample", {
	        templateUrl : "common/pages/PAGE_ADDSAMPLE.htm"
	    })
	    .when("/Map", {
	        templateUrl : "common/pages/PAGE_MAP.htm"
	    })
	    .when("/PAGEabout", {
	        templateUrl : "common/pages/PAGE_about.htm"
	    });
	});

app.controller('myCtrl', function($scope, $q, $http, $sce, $window, $compile, $interpolate, $parse, $interval, $mdDialog, $mdSidenav, $mdToast, $mdMenu, $timeout, leafletBoundsHelpers) {
//// ONLOAD -----------------------------------------ONLOAD///////////////
//// ONLOAD -----------------------------------------ONLOAD///////////////
//// ONLOAD -----------------------------------------ONLOAD///////////////
	console.log(">>> [0] Initialization:");
  console.log("'I am Controller'");
// load additional controller parts:
expandControllerA($scope);
exConExportDialog($scope, $mdDialog);
loadCustomDirectives($scope);

///-1-////IMPORT DATA FROM MySQL and generate Arrays//////////////////////
 $scope.getProben = function() {
      $http({
            method : "GET",
            url : "scripts/datenHolen.php"
        }).then(function mySuccess(response) {
          $scope.proben = response.data;
            console.log('Daten geladen');
            //console.log('Daten geladen',response.data);
        }, function myError(response) {
            console.log('Daten NICHT geladen', response);
        }).then(function Konvertieren(){

          var werteD = []; 	  //DataExplorer
          var werteK = []; 	  //Map
          var werteE =[];     //Export List
          werteE.push({label: 'ExportList', proben: $scope.proben});
          
          
          
          for (var i = 0; i < $scope.proben.length; i++) {
            // search for string "Modern" and replace by value 0, additionally exclude ages older than 50ka
            if ($scope.proben[i].C_02 < 50000) {

              if ($scope.proben[i].C_02==="Modern") {
                var temp = 0;
              } else {
                var temp = parseFloat($scope.proben[i].C_02);
              }

            }
            
            // get vertical position -> indicator (RSL, D7_01) or limiting (elevation, D3_11)
            if ($scope.proben[i].D5_01===0 ) {
              var hoehe = parseFloat($scope.proben[i].D7_01);
            } else {
              var hoehe = parseFloat($scope.proben[i].D3_11);
            }
            
            werteD.push({
              label: $scope.proben[i].A_01, 
              x: temp, 
              y: parseFloat($scope.proben[i].D7_01), 
              e: parseFloat($scope.proben[i].D3_11), 
              art: parseFloat($scope.proben[i].D5_01), 
              x_UID: parseFloat($scope.proben[i].A_00)
            })
            
            werteK.push({
              id: i, 
              name: $scope.proben[i].A_01, 
              reference: $scope.proben[i].A_02,
              lat: parseFloat($scope.proben[i].B_03), 
              lng: parseFloat($scope.proben[i].B_04), 
              A: temp, 
              B: hoehe, 
              C: parseInt($scope.proben[i].D5_01), 
              show: false, 
              x_UID: parseFloat($scope.proben[i].A_00)})
            };
            console.log(">>> [1]	Generate Arrays:");
            console.log("Dataviewer->",werteD,"Map->",werteK,"Export->werteE",werteE);
            
            ExportList = ({label: 'ExportList', proben: $scope.proben});
            $scope.Exportieren = ExportList;
            $scope.samples=werteK;
            
            $scope.werteE=werteE;

          // Create markers2
    var markers = {};
    for (var i = 0; i < werteK.length; i++) {
      markers[werteK[i].name] = {
        lat: werteK[i].lat,
        lng: werteK[i].lng,
        focus: true,
        title: werteK[i].name,
        message: "Age: " + werteK[i].A + "; Elevation: " +werteK[i].B + "; Indicator Type: " + werteK[i].C + "; Ref: "+ werteK[i].reference
      }
    }
    // $scope.samples=markers;
            console.log(">>> [2 b] MAP: Markers");
            console.log("markers2 :",markers)

        });     
  }

// Start timing now
console.time("EierUhr_getProben");


  $scope.getProben();


console.timeEnd("EierUhr_getProben");


//// Interface initialization -------------------------/////////////////////////
console.log(">>> [0] Interface:")
$scope.closeSideNav = function(dieses) {
  if (dieses==='links') {
    $scope.linksOpen = false;
  }
  $mdSidenav(dieses).close();
}

// sort shit for tables
$scope.sortierung   = [];
$scope.sortType     = 'name'; // set the default sort type
$scope.sortReverse  = false;  // set the default sort order
$scope.searchFish   = '';     // set the default search/filter term


//// INITAL SACHEN DER KARTE
  angular.extend($scope, {
      watchOptions:{
        paths: {
          individual: { type: 'watch'}, //this keeps indigest errors from happening.... (deep by default) // Funktioniert nicht :(
          type: 'watchCollection'
        }
      },
      mapData: {
          lat: 53.109015,
          lng: 8.849977,
          zoom: 18
      },
      markers: {
        beiDir: {
          lat: 53.109015,
          lng: 8.849977,
          focus: true,
          message: "SLCC @ MARUM"
        }
      },
      bounds: {},
      events: {},
      paths: {}
  });

//// SITUATIVE -----------------------------------------SITUATIVE///////////////
//// SITUATIVE -----------------------------------------SITUATIVE///////////////
//// SITUATIVE -----------------------------------------SITUATIVE///////////////

// 				GROUPING 				//////////////////

// 

//lookup namestrings in respective json lookup table 
// see scripts/generalFunctions.js nachSchlagen.

$scope.nachSchlagen = nachSchlagen;


//				 LINKS <-----> RECHTS ////////////////
// hier werden die werteD fuer die plots aufbereitet 
//		OLD:	$scope.select
$scope.select = function(site) {
	$scope.selected = site;
	var werteXY = [];
	var labelsXY = [];
  var werteSCATTER = [];
  var werteSCATTER = [{key: 'Marine',values:[]},{key: 'Indicator',values:[]},{key: 'Terrestrial',values:[]}];
  console.log("werteSCATTER", werteSCATTER)

	for (var i = 0; i < $scope.selected.proben.length; i++) {
	 	if ($scope.selected.proben[i].C_02==="Modern" && $scope.selected.proben[i].C_02 < 150000) {
       // find string "modern" and replace with value 0
        var temp = 0;
      } else if ($scope.selected.proben[i].C_02==="n/a") {
        // if no corrected age [C_02] is given, fall back to uncorrected age [C_04]
        var temp = parseFloat($scope.selected.proben[i].C_04);
	  	} else {
        // for all other cases just use [C_02]
	    	var temp = parseFloat($scope.selected.proben[i].C_02);
      }
      
		werteXY.push({
      label: $scope.selected.proben[i].A_01, 
      x: temp, 
      y: parseFloat($scope.selected.proben[i].D7_01), 
      e: parseFloat($scope.selected.proben[i].D3_11), 
      art: parseFloat($scope.selected.proben[i].D5_01)
    })


    
if (werteXY[i].art===-1) {
  werteSCATTER[0].values.push({
    x: temp, 
    y: parseFloat($scope.selected.proben[i].D3_11),
    size: 5, 
    shape: "triangle-up",
    label: $scope.selected.proben[i].A_01,
    reference: $scope.selected.proben[i].A_02
  });
  
} else if (werteXY[i].art===0) {
  werteSCATTER[1].values.push({
    x: temp, 
    y: parseFloat($scope.selected.proben[i].D3_11),
    size: 5, 
    shape: "circle",
    label: $scope.selected.proben[i].A_01,
    reference: $scope.selected.proben[i].A_02
  });
} else {
  werteSCATTER[2].values.push({
    x: temp, 
    y: parseFloat($scope.selected.proben[i].D3_11),
    size: 5, 
    shape: "triangle-down",
    label: $scope.selected.proben[i].A_01,
    reference: $scope.selected.proben[i].A_02
  });
}


    labelsXY.push($scope.selected.proben[i].A_01)
    
  };
  // sort werteXY by age [x]
  $scope.werteXY = werteXY.sort(function(a, b){return a.x - b.x;});;
  // werteXY are an array containing Samples within selection sorted by age (x)
  // (label, x, y, art)

  // sort indicator types
	  var werteTERR = [{x: null, y: null}];
	  var werteINDI = [{x: null, y: null}];
	  var werteMAR = [{x: null, y: null}];
  for (var i = 0; i < $scope.werteXY.length; i++) {
    if ($scope.werteXY[i].art === 0) {
      werteINDI.push({
        x: parseFloat($scope.werteXY[i].x), 
        y: parseFloat($scope.selected.proben[i].D7_01)
      })
    }else if (werteXY[i].art === 1) {
      werteTERR.push({
        x: parseFloat($scope.werteXY[i].x), 
        y: parseFloat($scope.selected.proben[i].D3_11)
      })
    }else{
      werteMAR.push({
        x: parseFloat($scope.werteXY[i].x), 
        y: parseFloat($scope.selected.proben[i].D3_11)
      })
    }
  };

  //  sort and append to dataseries Terr -> Indicator -> Marine
// var indiSORT = werteINDI.sort(function(a, b){return a.x - b.x;});
// var terrSORT = werteTERR.sort(function(a, b){return a.x - b.x;});
// var marSORT = werteMAR.sort(function(a, b){return a.x - b.x;});

  
  $scope.datenPlotXY = [];
  // $scope.datenPlotXY.push({Terrestrial: terrSORT});
  // $scope.datenPlotXY.push(terrSORT);
  // $scope.datenPlotXY.push(terrSORT, indiSORT, marSORT);
  $scope.datenPlotXY.push(werteTERR, werteINDI, werteMAR);
  // $scope.datenPlotXY.push({Indicator: indiSORT});
  // $scope.datenPlotXY.push(indiSORT);
  // $scope.datenPlotXY.push(marSORT);
  $scope.seriesXY = ['Terrestrial', 'Indicator', 'Marine']
  $scope.werteXY = werteXY;
  $scope.labelsXY = labelsXY;

$scope.werteSCATTER = werteSCATTER;


 	console.log('>>> [f1] Details:');
    console.log('label ------> site.label >', site.label);
	console.log('Counts: Terrestrial: ', werteTERR.length -1,' - Indicator: ', werteINDI.length -1, ' - Marine: ', werteMAR.length-1);
	console.log('Plot Array:', $scope.werteXY);



	// open panels
	$scope.linksOpen = true;
  	$mdSidenav('links').open();
  	$mdSidenav('rechts').open();
};
//SHOW function


//				EXPORT DIALOG 			///////////////
// hier werden die werteE fuer die plots aufbereitet
//		OLD:	$scope.detail

//// LEAFLET -----------------------------------------LEAFLET///////////////
//// LEAFLET -----------------------------------------LEAFLET///////////////
//// LEAFLET -----------------------------------------LEAFLET///////////////
//ALLE SAMPLES
  $scope.allePunkte = false; //DUMMY-VAR für alle/keine Punkte laden
  $scope.toggleAll = function() {
    var samples = $scope.samples;
    if ($scope.allePunkte===false) {
      for (var i = 0; i < samples.length; i++) {
        samples[i].selected = true;
      }
    } else {
      for (var i = 0; i < samples.length; i++) {
        samples[i].selected = false;
      }
    }
    $scope.allePunkte = !$scope.allePunkte; // Toggler true <==> false
    $scope.processMapInfo();
  }

// Add auswahl to export list
$scope.loadforExport = function() {
  var auswahlExp = $scope.auswahl;
  var alle = $scope.Exportieren;
  for (var i = 0; i < auswahlExp.length; i++) {
    for (var j = 0; j < alle.proben.length; j++) {
      if (alle.proben[j].A_01 == auswahlExp[i].title) {

        alle.proben[j].show = true;
      }
    }
  }


  AlleExport = [];
  for (var i = 0; i < alle.proben.length; i++) {
    if (alle.proben[i].show == true){
      AlleExport.push(alle.proben[i]);
    }
  }
  $scope.Exportiert = true;
console.log("anzahl4export:", auswahlExp.length);
console.log("auswahlExp:", auswahlExp);
console.log("alle.proben:", alle.proben);
console.log("exportkram:", alle);
console.log("exportkramSOLO:", AlleExport);
$scope.ExportProben2 = alle;
}

// SAMPLES AUSWÄHLEN
  $scope.selectM = function(id) {
    var samples = $scope.samples;
    for (var i = 0; i < samples.length; i++) {
      if (samples[i].id===id) {
        samples[i].selected = !samples[i].selected; // Toggler true <==> false
        break;
      }
    }
    $scope.processMapInfo();
  }

// AUSGEWÄHLTE SAMPLES PROCESSEN
  $scope.processMapInfo = function() {
    var selected = [];
    var samples = $scope.samples;
    $scope.Exportiert = false;
    for (var i = 0; i < samples.length; i++) {
      if (samples[i].selected===true) {
        selected.push(samples[i]);
      }
    }

    var markers = {};
    for (var i = 0; i < selected.length; i++) {
      markers[selected[i].name] = {
        lat: selected[i].lat,
        lng: selected[i].lng,
        focus: true,
        title: selected[i].name,
        message: "Age: " + selected[i].A + "; Elevation: " +selected[i].B + "; Indicator Type: " + selected[i].C + "; Ref: "+ selected[i].reference
      }
    }

                    console.log('>>> [M] Map User Input');

    console.log("Ausgewählte \"Marker\" => ", markers); // Die Marker sind ein Objekt mit Objekten!! Kein Array mit Objekten o.ä.

    // Die "markers" der Funktion an die leaflet "markers" geben...
    angular.extend($scope, {
        markers: markers
    });

    //An sich sind jetzt alle Marker auf der Karte...
    //Man müsste rauszommen um sie zu sehen === uncool ==>
    var length = Object.keys(markers).length; // markers.length geht nicht da kein Array!!!

    // Wenn nur ein Punkt spring zu diesem...
    if (length===1) {
      angular.extend($scope, {
        mapData: {
          lat: markers[selected[0].name].lat, //markers[0] geht nicht da kein Array
          lng: markers[selected[0].name].lng, //markers[0] geht nicht da kein Array
          focus: true,
          zoom: 10
        }
      });
    }

    // Wenn keins ausgewählt...
    if (length===0) {
      angular.extend($scope, {
        mapData: {
            lat: 53.0970552409864,
            lng: 8.87328118085861,
            zoom: 18
        },
        markers: {
          beiDir: {
            lat: 53.09781864097065,
            lng: 8.873010277748108,
            focus: true,
            message: "Here lives the programmer..."
          }
        }
      });
    }

    // Wenn mehr als eins
    if (length>1) {
      // "Ecken" finden...
      var maxLat = -Infinity;
      var maxLng = -Infinity;
      var minLat = Infinity;
      var minLng = Infinity;
      for (key in markers) {
        if (markers[key].lat > maxLat) { maxLat = markers[key].lat; }
        if (markers[key].lng > maxLng) { maxLng = markers[key].lng; }
        if (markers[key].lat < minLat) { minLat = markers[key].lat; }
        if (markers[key].lng < minLng) { minLng = markers[key].lng; }
      }
      var NW = [maxLat, minLng];
      var SE = [minLat, maxLng];

      // Diese Ecken als Bounds verwenden...
      var bounds = leafletBoundsHelpers.createBoundsFromArray([
        NW, SE
      ]);

      angular.extend($scope, {
          bounds: bounds
      });

      $scope.markers = markers;

      // Das stellt sicher dass wenn es bereits eine Auswahl gibt und man Samples an und abwählt diese auch in der Auswahlliste auftauchen.
      // Genau das gleiche wie in der nächsten Klick-Funktion ab der Zeile wo "$scope.maxLat = maxLat" steht.
      if ($scope.auswahl!==undefined && $scope.auswahl!=='') {
          maxLat = $scope.maxLat;
          maxLng = $scope.maxLng;
          minLat = $scope.minLat;
          minLng = $scope.minLng;
        var auswahl = [];
        for (key in markers) {
          if (markers[key].lat > minLat && markers[key].lat < maxLat && markers[key].lng > minLng && markers[key].lng < maxLng) {
            auswahl.push(markers[key]);
          }
        }
        console.log("Auswahl im Rechteck ==>", auswahl);
        $scope.auswahl = auswahl;
      }
    }
  }

  // BEI KLICK AUF DER KARTE...
  $scope.$on("leafletDirectiveMap.click", function(event, args){
    // console.log(args);
    var markers = $scope.markers;
    var length = Object.keys(markers).length;
    var paths = {};
    $scope.Exportiert = false;

    if (length<=1) {
      return; //Wenn weniger als zwei ausgewählte Samples mach nichts...
    }
    
    var leafEvent = args.leafletEvent;

    // Wenn noch kein Auswahlpunkt...
    if ($scope.markers.auswahl1===undefined) {
      $scope.auswahl = '';
      $scope.markers.auswahl1 = {
        icon: {
          iconUrl: 'img/platzhalter.svg'
        },
        lat: leafEvent.latlng.lat,
        lng: leafEvent.latlng.lng,
        focus: true,
        auswahlpunkt: true,
        message: "Please select second point!"
      }
    }
    // Wenn noch kein zweiter Auswahl Punkt...
    else if ($scope.markers.auswahl1!==undefined && $scope.markers.auswahl2===undefined) {
      $scope.auswahl = '';
      $scope.markers.auswahl1.message = "first selection point";

      $scope.markers.auswahl2 = {
        icon: {
          iconUrl: 'img/platzhalter.svg'
        },
        lat: leafEvent.latlng.lat,
        lng: leafEvent.latlng.lng,
        focus: true,
        auswahlpunkt: true,
        message: "selection..."
      }
    }

    // Wenn es bereits zwei Auswahlpunkte gibt ==> Reset
    else if ($scope.markers.auswahl1!==undefined && $scope.markers.auswahl2!==undefined) {
      $scope.auswahl = '';
      delete $scope.markers.auswahl1;
      delete $scope.markers.auswahl2;
    }

    // Bei Zwei Auswahlpunkten.. unabhänig von der vorherigen if-function
    if ($scope.markers.auswahl1!==undefined && $scope.markers.auswahl2!==undefined) {
      // Kompliziert aufgrund mangelnder geographischer Kenntnisse :) Wann MUSS ein Punkt (rechnerisch) in der Auswahl liegen?
      var temp = [ $scope.markers.auswahl1, $scope.markers.auswahl2 ];
      paths = {
        rectangle: {
          type: "rectangle",
          latlngs: temp
        },
      }
      $scope.pathsBackup = paths;
      console.log('Das Rechteck ==>', paths);
      var maxLat = -Infinity;
      var maxLng = -Infinity;
      var minLat = Infinity;
      var minLng = Infinity;
      if ($scope.markers.auswahl1.lat > maxLat) { maxLat = $scope.markers.auswahl1.lat; };
      if ($scope.markers.auswahl2.lat > maxLat) { maxLat = $scope.markers.auswahl2.lat; };
      if ($scope.markers.auswahl1.lng > maxLng) { maxLng = $scope.markers.auswahl1.lng; };
      if ($scope.markers.auswahl2.lng > maxLng) { maxLng = $scope.markers.auswahl2.lng; };

      if ($scope.markers.auswahl1.lat < minLat) { minLat = $scope.markers.auswahl1.lat; };
      if ($scope.markers.auswahl2.lat < minLat) { minLat = $scope.markers.auswahl2.lat; };
      if ($scope.markers.auswahl1.lng < minLng) { minLng = $scope.markers.auswahl1.lng; };
      if ($scope.markers.auswahl2.lng < minLng) { minLng = $scope.markers.auswahl2.lng; };
      // console.log(minLat, maxLat, minLng, maxLng );
      $scope.maxLat = maxLat;
      $scope.maxLng = maxLng;
      $scope.minLat = minLat;
      $scope.minLng = minLng;
      console.log("markers", markers);
      var auswahl = [];
      for (key in markers) {
        if (markers[key].lat > minLat && markers[key].lat < maxLat && markers[key].lng > minLng && markers[key].lng < maxLng) {
          auswahl.push(markers[key]);
        }
      }
      console.log("Auswahl im Rechteck ==>", auswahl);
      $scope.auswahl = auswahl;
    }

    // EGAL WAS ==> DANN DAS
    angular.extend($scope, {
        markers: $scope.markers,
        paths: paths
    });
  });
//// CONFIGs -----------------------------------------CONFIGs///////////////
//// CONFIGs -----------------------------------------CONFIGs///////////////
//// CONFIGs -----------------------------------------CONFIGs///////////////

/// NVD3 plots ///////////////////////////////////
/// NVD3 plots ///////////////////////////////////
/// NVD3 plots ///////////////////////////////////
$scope.options = scatterPlotOptions;

//////////ENDOFCONTROLLER////////////////////////////////
});


</script>

</body>
</html>
