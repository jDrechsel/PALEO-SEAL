expandControllerMAPfunc = function($scope, $filter, leafletData, $mdDialog){
    /* 
    Here all functions concerning data preparation for the map can be found.
    I. Function to create markers from selected samples (conversion to leaflet standard)

                    $scope.
                        toggleAll()
                        processMapInfo()
                        selectM()
                        loadforExport()

    II. Function(s) to select markers by dragging a rectangle selection tool

      $scope.$on("leafletDirectiveMap.click", function(event, args){
          
                  a. draw rectangle
                  b. select markers inside rectangle
                  c. show preliminary export list

      });
    */

      $scope.showMap = function(id){
        /* PURPOSE: 
            Process group samples and append them to map
            -> Layers (?watch?) */
       
        // process proben in group
        var local_icons = {
          default_icon: {},
          jd_icon_custom: {
              iconUrl: "common/ressource/images/marker-icon.png",
              shadowUrl: "common/ressource/images/marker-shadow.png",
              iconSize: [32, 42],
              shadowSize: [32, 32],
              iconAnchor: [16, 42],
              shadowAnchor: [8, 28],
              popupAnchor: [0, -32]
          },
          jd_icon_marum: {
              iconUrl: "common/img/jdMarkerMarum.png",
              shadowUrl: "common/img/jdMarkerCustomShadow.png",
              iconSize: [32, 42],
              shadowSize: [32, 32],
              iconAnchor: [16, 42],
              shadowAnchor: [8, 28]
          },
          jd_icon_slcc: {
              iconUrl: "common/img/jdMarkerSLCC.png",
              shadowUrl: "common/img/jdMarkerCustomShadow.png",
              iconSize: [32, 42],
              shadowSize: [32, 32],
              iconAnchor: [16, 42],
              shadowAnchor: [8, 28]
          }
      };
      angular.extend($scope, {
          icons: local_icons
      });



      // elemntCard.classList.toggle("groupSelected");
      $scope.selected = id;
      $scope.detailName=$scope.selected.label2;


      
      // toggle visibility in Plot ()
      for (var i = 0; i < $scope.werteALL.length; i++) {
          $scope.werteALL[i].plot = false;
      };
      for (var i = 0; i < $scope.selected.proben.length; i++) {
          $scope.selected.proben[i].plot = true;
      };

      // Generate markers (have to me mapped to fit leaflet & leaflet cluster standards)
        let markers = {};
        let mapMarkersAccepted=[];
        let mapMarkersRejected=[];
        for (var i = 0; i < id.proben.length; i++) {
          


          if (isNaN(id.proben[i].lat) || isNaN(id.proben[i].lng)){
            mapMarkersRejected.push(
             {
                lat: id.proben[i].lat,
                lng: id.proben[i].lng,
                title: id.proben[i].label,
                xUID: id.proben[i].xUID,
                indicatorType: id.proben[i].type_string,
                reference: id.proben[i].reference,
              }  
            );
          } else {
            mapMarkersAccepted.push(
             {
                lat: id.proben[i].lat,
                lng: id.proben[i].lng,
                title: id.proben[i].label,
                xUID: id.proben[i].xUID,
                indicatorType: id.proben[i].type_string,
                reference: id.proben[i].reference,
              }  
            );
            markers[id.proben[i].xUID] = {
              lat: id.proben[i].lat,
              lng: id.proben[i].lng,
              focus: true,
              title: id.proben[i].label,
              icon: local_icons.jd_icon_custom,
              layer: "samples",
              xUID: id.proben[i].xUID,
              indicatorType: id.proben[i].type_string,
              reference: id.proben[i].reference,
              message: '<h4>'+ id.proben[i].label +'</h4>'+  id.proben[i].reference + '<p>' + id.proben[i].type_string + '</p><p>' +  id.proben[i].feature + '</p><p> Age:'  + id.proben[i].age + ' a </p><p> PaleoRSL/Elevation:'  +id.proben[i].elevation + ' m</p>' 
              };

            ////////////////////////
            
          
          }

        }
        $scope.markers=markers;

        $scope.mapMarkersAccepted=mapMarkersAccepted;
        $scope.mapMarkersRejected=mapMarkersRejected;

        
       
        // Hand "markers" of function to leaflet "Markers"
        angular.extend($scope, {
            markers: markers
        }); //ENDOF::: --> Generate markers

       

        // get scope
        var samples = $scope.werteALL;
        for (var i = 0; i < samples.length; i++) {
          if (samples[i].id===id) {
              samples[i].map = !samples[i].map; // Toggler true <==> false
              break;
          }
        };


      };// endof showMap()

    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////INIT MAP//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.initMap = function(){
      /* 
        initialize map on page load, 
          -> for jumping pages and keeping layers
          => LOG Map Params!  
      */
    

      /* 
        Create Layer holding the drawn rectangle (Selection) 
      */
      let editableLayers = new L.FeatureGroup();

      /*
        Get map as map,
        then run several functions:
          -> add layer "drawn"
          -> get layers, then:
            -> clear old rectangle (on drawstart)
            -> 
      */
      leafletData.getMap().then(function(map) {

        
        map.addLayer(editableLayers);
   
        leafletData.getLayers().then(function() {
          var drawnItems = editableLayers;
          map.on('draw:drawstart',function (e){

            editableLayers.clearLayers();
          })
          map.on('draw:created', function (e) {
            e.layer.bindTooltip("Click selection to continue...",
            {
              permanent: true, 
              sticky: true,
              className: "selectionTooltip", 
            })
            var layer = e.layer;
            drawnItems.addLayer(layer);
            $scope.mapHint="Click rectangle to continue...";

          });

          drawnItems.on('click', rectangleClick);

          function rectangleClick(e){
            $scope.mapHint="";
            var rectMarkers = jsonToArray(leafletData.getMarkers().$$state.value);
            var result = e.layer.contains(rectMarkers);
            $scope.result = result;
            //Open Sidenav with result -> Button Add to Export List : addSelectedToExport()
            $scope.openSidenav();
           
          }
        }).catch((error)=>{
          console.log("error: 1 ", error);
        });
      }).catch((error)=>{
        console.log("error: 2 ", error);
      });

      L.Rectangle.include({
        // Single marker case
        contains: function (marker) {
          return this.getBounds().contains(marker.getLatLng());
        },
        // Array of markers (if grouped in cluster)
        contains: function (markers) {
          var markersContained = [];
          var markersGesamt =[];
          markers.forEach(marker => {
            markersContained.push(this.getBounds().contains(marker.getLatLng()));
            if (this.getBounds().contains(marker.getLatLng())){
              markersGesamt.push(marker);
            }
          })
          return markersGesamt;
        }
      });
      
      function jsonToArray(jsonObject) {
        var result = [];
        var keys = Object.keys(jsonObject);
        keys.forEach(function (key) {
          result.push(jsonObject[key]);
        });
        return result;
      }
      

      
      $scope.addSelectedToExport = function (){
        for ( var i = 0 ; i < $scope.result.length ; i++ ) {
          const result2 = $scope.werteALL.findIndex( sample => sample.xUID === $scope.result[i].options.xUID );
          $scope.werteALL[result2].export = true;
        };
        $scope.closeSideNav('links');
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Done!')
            .textContent('Added to Export')
            .ok('OK')
        );
      };

      $scope.removeSelectedFromExport = function (){
        for ( var i = 0 ; i < $scope.result.length ; i++ ) {
          const result2 = $scope.werteALL.findIndex( sample => sample.xUID === $scope.result[i].options.xUID );
          $scope.werteALL[result2].export = false;
        };
        $scope.closeSideNav('links');
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Done!')
            .textContent('Removed from Export')
            .ok('OK')
        );

      };
      
    };// end of map init     
};