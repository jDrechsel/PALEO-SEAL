expandControllerMAPfunc = function($scope, $filter, leafletData){
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
        console.log("Map Button clicked... ->ID: ",id);
        console.log("Map Button clicked... ->ID: ",id.label);
        console.log("Map Button clicked... ->ID: ",id.proben);

        // process proben in group
        var local_icons = {
          default_icon: {},
          jd_icon_custom: {
              // iconUrl: "common/img/jdMarkerCustom.png",
              // shadowUrl: "common/img/jdMarkerCustomShadow.png",
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


        var markers = {};
        let markersGeoJSON=[];
        let mapMarkersRejected={};
        console.log("markers: @in: ",markers);
        for (var i = 0; i < id.proben.length; i++) {
          // console.log("Map Marker label[i]: ", id.proben[i].label)
          if (id.proben[i].lat != NaN && id.proben[i].lng != NaN){
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
            // message: <h3>id.proben[i].label</h3> + "Age: " + id.proben[i].age + "; Elevation: " +id.proben[i].elevation + "; Indicator Type: " + id.proben[i].type + "; Ref: "+ id.proben[i].reference
            message: '<h4>'+ id.proben[i].label +'</h4>'+  id.proben[i].reference + '<p>' + id.proben[i].type_string  + '</p><p> Age:'  + id.proben[i].age + '- Elevation:'  +id.proben[i].elevation + '</p>' 
            };
          } else {
            mapMarkersRejected.push(
              markers[id.proben[i].xUID] = {
                lat: id.proben[i].lat,
                lng: id.proben[i].lng,
                title: id.proben[i].label,
                xUID: id.proben[i].xUID,
                indicatorType: id.proben[i].type_string,
                reference: id.proben[i].reference,
              }
            );
          }
            // geoJSON option:
            let markerGeoJSON = {
              "type": "Feature",
              "properties": {
                "name": id.proben[i].label,
                "xUID": id.proben[i].xUID,
                "indicator": id.proben[i].type_string,
                "show_on_map": id.proben[i].map
                
              },
              "geometry":{
                "type": "Point",
                "coordinates": [id.proben[i].lng, id.proben[i].lat]
              }
            };
            markersGeoJSON.push(markerGeoJSON);
        }
        $scope.markers=markers;
        $scope,markersGeoJSON=markersGeoJSON;

        console.log('>>> [M] Map User Input');

        console.log("Geladene \"Marker\" => ", markers); // Die Marker sind ein Objekt mit Objekten!! Kein Array mit Objekten o.ä.
        console.log("Rejected \"Marker\" => ", mapMarkersRejected); // Die Marker sind ein Objekt mit Objekten!! Kein Array mit Objekten o.ä.
        console.log("Geladene \"MarkersJSON\" => ", markersGeoJSON); // Die Marker sind ein Objekt mit Objekten!! Kein Array mit Objekten o.ä.
        // console.log("Geladene \"MarkersCONV\" => ", markersCONV); // Die Marker sind ein Objekt mit Objekten!! Kein Array mit Objekten o.ä.
       
       
        L.geoJSON($scope.markersGeoJSON, {
          filter: function(feature, layer) {
              return feature.properties.show_on_map;
          }
        }); // .addTo(map);
        // Die "markers" der Funktion an die leaflet "markers" geben...
        angular.extend($scope, {
            markers: markers
        });


        // get scope
        var samples = $scope.werteALL;
        console.log("var samples: ", samples);
        for (var i = 0; i < samples.length; i++) {
          if (samples[i].id===id) {
              samples[i].map = !samples[i].map; // Toggler true <==> false
              break;
          }
        };
        // $scope.processMapInfo();
        console.log("MAP: processed samples", samples);

      };// endof showMap()

    // I. process markers
    $scope.allePunkte = false;

    // Show all samples on map (set map visibility to true)
    // !! samples[i].selected is old !! change to samples[i].map !! better: come up with better structure!
    $scope.toggleAll = function(){
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
    };
    
    var markers = {};
    $scope.processMapInfo= function(){
    /* 
    Convert Samples from inital array to leaflet format
    */
        var selected = [];
        var samples = $scope.werteALL;
        $scope.Exportiert = false;
        console.log("var samples.length: ", samples.length);
        for (var i = 0; i < samples.length; i++) {
          if (samples[i].map===true) {
            selected.push(samples[i]);
          }
        }
        console.log("var samples.map: ", samples.map);
        console.log("var selected: ", selected);

        console.log("markers: @in: ",markers);
        for (var i = 0; i < selected.length; i++) {
            markers[selected[i].label] = {
            lat: selected[i].lat,
            lng: selected[i].lng,
            focus: true,
            title: selected[i].label,
            // icon: local_icons.jd_icon_custom,
            message: "Age: " + selected[i].A + "; Elevation: " +selected[i].B + "; Indicator Type: " + selected[i].C + "; Ref: "+ selected[i].reference
            }
        }
        $scope.markers=markers;
        console.log('>>> [M] Map User Input');

        console.log("Ausgewählte \"Marker\" => ", markers); // Die Marker sind ein Objekt mit Objekten!! Kein Array mit Objekten o.ä.

        // Die "markers" der Funktion an die leaflet "markers" geben...
        angular.extend($scope, {
            markers: markers
        });

    };


    // SAMPLES AUSWÄHLEN [toggle Map: true]
    $scope.selectM = function(id) {
        var samples = $scope.samples;
        for (var i = 0; i < samples.length; i++) {
            if (samples[i].id===id) {
                samples[i].selected = !samples[i].selected; // Toggler true <==> false
                break;
            }
        }
        $scope.processMapInfo();
    };

    // $scope.$on("leafletDirectiveMap.click", function(event, args){
    //       console.log("map clicked");
    //       console.log("args",args);
    //     // a. draw rectangle
    //     // b. select markers inside rectangle
    //     // !! could be easier with esri draw stuff
    //     // c. show preliminary export list
        
    //   });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////INIT MAP//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.initMap = function(){
      /* 
        initialize map on page load, 
          -> for jumping pages and keeping layers
          => LOG Map Params!  
      */
    //  L.control.attribution();
      console.log("iniiiit!!!");
      console.log("map scopes >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      // console.log("markers", $scope.markers);
      // console.log("layers: ", $scope.layers);
      // console.log("controls: ", $scope.controls);
      // console.log("leafletData: ", leafletData);

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
        console.log("map init -> map ==>", map);

        
        map.addLayer(editableLayers);
   
        console.log("editableLayers ID => ", (editableLayers._leaflet_id)); 
        leafletData.getLayers().then(function() {
          var drawnItems = editableLayers;
          map.on('draw:drawstart',function (e){
            console.log("event: drawstart! ---------------------------------------------->>>>")

            editableLayers.clearLayers();
          })
          map.on('draw:created', function (e) {
            console.log("event: drawcreated! ---------------------------------------------->>>>")

            var layer = e.layer;
            drawnItems.addLayer(layer);
            

          });

          drawnItems.on('click', rectangleClick);

          function rectangleClick(e){

            var rectMarkers = jsonToArray(leafletData.getMarkers().$$state.value);
            var result = e.layer.contains(rectMarkers);
            $scope.result = result;
            //Open Sidenav with result -> Button Add to Export List : addSelectedToExport()
            $scope.openSidenav();
            console.log("testmarkers: ", rectMarkers);
            console.log('result => ', result);
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
        // Array of markers
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
        console.log("addSelectedToExport()");
        for ( var i = 0 ; i < $scope.result.length ; i++ ) {
          console.log("i, $scope.result[i] : ", i, $scope.result[i].options.title);
          // if ($scope.result.options.xUID == werteALL.)
          // var expIndex= $scope.werteALL.findIndex($scope.result[i].options.xUID);
          // console.log(expIndex);
          const result2 = $scope.werteALL.findIndex( sample => sample.xUID === $scope.result[i].options.xUID );
          console.log(result2);
          $scope.werteALL[result2].export = true;
        };
      };

      $scope.removeSelectedFromExport = function (){
        console.log("removeSelectedFromExport()");
        for ( var i = 0 ; i < $scope.result.length ; i++ ) {
          console.log("i, $scope.result[i] : ", i, $scope.result[i].options.title);
          // if ($scope.result.options.xUID == werteALL.)
          // var expIndex= $scope.werteALL.findIndex($scope.result[i].options.xUID);
          // console.log(expIndex);
          const result2 = $scope.werteALL.findIndex( sample => sample.xUID === $scope.result[i].options.xUID );
          console.log(result2);
          $scope.werteALL[result2].export = false;
        };
      };
      
    };// end of map init     
};