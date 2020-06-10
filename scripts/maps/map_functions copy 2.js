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
              shadowAnchor: [8, 28]
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
        console.log("markers: @in: ",markers);
        for (var i = 0; i < id.proben.length; i++) {
          // console.log("Map Marker label[i]: ", id.proben[i].label)
            markers[id.proben[i].xUID] = {
            lat: id.proben[i].lat,
            lng: id.proben[i].lng,
            focus: true,
            title: id.proben[i].label,
            icon: local_icons.jd_icon_custom,
            layer: "samples",
            // message: <h3>id.proben[i].label</h3> + "Age: " + id.proben[i].age + "; Elevation: " +id.proben[i].elevation + "; Indicator Type: " + id.proben[i].type + "; Ref: "+ id.proben[i].reference
            message: '<h4>'+ id.proben[i].label +'</h4>'+  id.proben[i].reference + '<p> Indicator Type:' + id.proben[i].type + id.proben[i].feature + '</p><p> Age:'  + id.proben[i].age + '- Elevation:'  +id.proben[i].elevation + '</p>' 
            }
        }
        $scope.markers=markers;
        console.log('>>> [M] Map User Input');

        console.log("Geladene \"Marker\" => ", markers); // Die Marker sind ein Objekt mit Objekten!! Kein Array mit Objekten o.ä.
        console.log("Geladene \"Marker\" => ", markers.length); // Die Marker sind ein Objekt mit Objekten!! Kein Array mit Objekten o.ä.

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

      };

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

    // $scope.processMapInfo= function(){

    // };

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

    $scope.$on("leafletDirectiveMap.click", function(event, args){
          console.log("map clicked");
          console.log("args",args);
        // a. draw rectangle
        // b. select markers inside rectangle
        // !! could be easier with esri draw stuff
        // c. show preliminary export list
      });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////INIT MAP//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.initMap = function(){
      console.log("iniiiit!!!");
      console.log("map scopes >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log("markers", $scope.markers);
      console.log("layers: ", $scope.layers);
      console.log("controls: ", $scope.controls);
      
      let editableLayers = new L.FeatureGroup();
      // ?? LOAD watched Layer drawn ??
      leafletData.getMap().then(function(map) {
        console.log("map init -> map ==>", map);
        console.log("map init -> map ==>", map._layers);

        // let clustered = L.markerClusterGroup();
        // clustered.addLayer(L.marker($scope.markers));
        // map.addLayer(clustered);
        // console.log("clustered: ", clustered);
        // console.log("clustered: ", clustered._leaflet_id);
        
        map.addLayer(editableLayers);
        map.eachLayer(function(layer){
          console.log("layerID",layer._leaflet_id);
          console.log("layer",layer);
          console.log("layer ", );
        });
        // let locationFilter = new L.LocationFilter().addTo(map);
        console.log("editableLayers ID => ", (editableLayers._leaflet_id)); // Die Marker sind ein Objekt mit Objekten!! Kein Array mit Objekten o.ä.
        leafletData.getLayers().then(function() {
          var drawnItems = editableLayers;
          //  var drawnItems = baselayers.overlays.drawn;
          map.on('draw:drawstart',function (e){
            console.log("event: drawstart! ---------------------------------------------->>>>")
            console.log("event: drawstart! ---------------------------------------------->>>>")
            editableLayers.clearLayers();
          })
          map.on('draw:created', function (e) {
            console.log("event: drawcreated! ---------------------------------------------->>>>")
            console.log("event: drawcreated! ---------------------------------------------->>>>")
            var layer = e.layer;
            drawnItems.addLayer(layer);
            $scope.polygon = layer.getLatLngs();
            console.log("var polygon ",$scope.polygon);
            $scope.rectangle=layer;
            $scope.rectangleBounds=layer._bounds;
            console.log("drawCreated e: ", e);
            console.log("layer (JSON stringified): ",JSON.stringify(layer.toGeoJSON()));
            // console.log("$scope.rectangle: ", $scope.rectangle);
            // console.log("$scope.rectangleBounds: ", $scope.rectangleBounds);
            // console.log("$scope.rectangle.latlngs: ", $scope.rectangle._latlngs);
            //  console.log("$scope.rectangle.bounds: ", $scope.rectangle._bounds);
            //  console.log("$scope.rectangle.bounds: ", $scope.rectangle._bounds._southWest.lat);
          });
          drawnItems.on('click', rectangleClick);
          function rectangleClick(e){
            console.log("###################################################################################");
            console.log("###################################################################################");
            console.log("event: rectangleClick! ---------------------------------------------->>>>")
            console.log("event: rectangleClick! ---------------------------------------------->>>>")
            console.log("rectClick e:  ", e);
            console.log("rectClick L:  ", L);
            console.log("rectClick map:  ", map);
            console.log("rectClick e.target:  ", e.target);
            console.log("rectClick e.target.parentElement:  ", e.target.parent);
            console.log("$scope.marker --> ", $scope.markers);
            console.log("$scope.marker l --> ", $scope.markers.length);
            console.log("CLICK: scope polygon ",$scope.polygon);
            let layers = e.layer;
            let polygon=layers.getLatLngs();
            $scope.polygonLL=layers.getLatLngs();
            // let selectionArea = layers.getLatLng();
            selectedMarkers=[];
   
            console.log("layers:  ", layers);
            $scope.rectangleBounds=e.layer._bounds
            $scope.rectangleFeatures=getFeaturesInRectangle();
            // alert("you clicked at:"+e.layer._bounds);
            
            
            
            
            console.log("###################################################################################");
            console.log("###################################################################################");
            console.log("click->target map: ", map);
            console.log("click->target Leaflet: ", Leaflet);
            // console.log("click->target Leaflet.childMs: ", Leaflet.getAllChildMarkers());
            console.log("click->target L: ", L);
            console.log("click->target e: ", e);
            // console.log("click->target cluster: ", Leaflet.getVisibleParent());
            console.log("click->target layer: ", e.layer);
            // console.log("click->target test .childMs: ", Leaflet.layer.getAllChildMarkers());
            console.log("click->target:layer.bounds ", e.layer._bounds);
            console.log("$scope.Bounds: ", $scope.rectangleBounds);
            console.log("$scope.Bounds: ", $scope.rectangleBounds._southWest);
            console.log("$scope.Bounds: ", $scope.rectangleBounds._northEast);
            
            console.log("$scope.markers: ", $scope.markers);
            console.log("$scope.Features: ", $scope.rectangleFeatures);
            console.log("$scope.markersWithinRectangle: ", $scope.markersWithinRectangle);
            console.log("###################################################################################");
            console.log("###################################################################################");
          }
        }).catch((error)=>{
          console.log("error: 1 ", error);
        });
      }).catch((error)=>{
        console.log("error: 2 ", error);
      });
      
      function getFeaturesInRectangle(){
        console.log("function: getFeaturesInRectangle! ---------------------------------------------->>>>")
        console.log("function: getFeaturesInRectangle! ---------------------------------------------->>>>")
        leafletData.getMap().then(function(map) {
          // $scope.markersWithinRectangle= $scope.markers.$filter(function(marker){
            //   return $scope.polygon.contains(L.LatLng(marker.lat, marker,lng));
            // })
            console.log("map: ",map);
            // console.log("markers: ",L.Marker);
            console.log("GFiR---- L: ",L);
            console.log("GFiR---- L.map: ",L.map);
            console.log("GFiR---- L.markers: ",L.map.markers);
            console.log("GFiR---- L.LatLng: ",L.LatLng);
            console.log("GFiR---- $scope.Bounds: ", $scope.rectangleBounds);
            console.log("GFiR---- $scope.markers.lat: ",$scope.markers.lat);
            console.log("GFiR---- $scope.markers.lng: ",$scope.markers.lng);
            let selectMarkers = $scope.markers;
            let markersWithinRectangle={};
            console.log("GFiR---- selectMarkers: ",selectMarkers);
            console.log("GFiR---- selectMarkers.keys: ", Object.keys(selectMarkers));
            console.log("GFiR---- selectMarkers.values: ", Object.values(selectMarkers));
            console.log("GFiR---- selectMarkers.len: ", Object.keys(selectMarkers).length);
            // selectMarkers.forEach(element => console.log(element));
            console.log("testing leaflet Map functions: ###########################################");
            
            let mapBounds = map.getBounds();
            let drawnBounds = $scope.rectangle.getBounds();
            console.log("mapBounds: ",mapBounds);
            console.log("drawnBounds: ",drawnBounds);
            
            let probenLayer = L.geoJson().addTo(map);
            console.log("empty probenlayer: ",probenLayer);
            for (var i = 0; i < Object.keys(selectMarkers).length; i++) {       
          // for (var i in selectMarkers.keys){
              let element = Object.entries(selectMarkers)[i];
              let elementGeoJSON = {
                "type": "Feature",
                "properties": {
                  "name": element[1].title,
                  "xUID": element[0],
                  
                },
                "geometry":{
                  "type": "Point",
                  "coordinates": [element[1].lng, element[1].lat]
                }
              };
              console.log("geoJSON: ", elementGeoJSON);
              console.log("geoJSON: ", L.geoJson(elementGeoJSON,{     }));
              probenLayer.addData(elementGeoJSON);
              // console.log("loop: i: ", i);
              // console.log("loop: key[i]: ", Object.keys(selectMarkers)[i]);
              // console.log("loop: key.title: ", Object.values(selectMarkers)[i].title);
              // console.log("loop: key.lat: ", Object.values(selectMarkers)[i].lat);
              // console.log("loop: key.lng: ", Object.values(selectMarkers)[i].lng);
              console.log("element: ", element);

              console.log("element.values: ", element[1].title );
              console.log("element.getLatLng: ",element[1].getLatLng);

            };
            console.log("probenLayer: ",probenLayer);
          
        });
      }
    };// end of map init     

};