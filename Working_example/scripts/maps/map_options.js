expandControllerMAP = function($scope){
    /*
    Initial Setup for map
    I.       Custom Markers
    II.      inital markers
    III.     Base layers (ESRI)
    */
    
    // I.
    let standard_icon = L.icon({
        iconUrl: "common/ressource/images/marker-icon.png",
            shadowUrl: "common/ressource/images/marker-shadow.png",
            iconSize: [32, 42],
            shadowSize: [32, 32],
            iconAnchor: [16, 42],
            shadowAnchor: [8, 28],
            popupAnchor: [-3, -20]
    });
    let local_icons = {
        
    };
    
    // II.
    angular.extend($scope, {
        watchOptions:{
            paths:{
                individual: {type: "watch"},
                type: "watchCollection"
            }
        },
        controls: {
            draw:{
                draw: {
                    polyline: false,
                    polygon: false,
                    circle: false, // Turns off this drawing tool
                    rectangle: {
                        shapeOptions: {
                            clickable: true, 
                        }
                    },
                    marker: false,
                    circlemarker: false,
                    
                    
                   
                },
               
            },
            
        },
        // Icons
        icons: {//local_icons, //-> [!] obsolete, 
            jd_default_icon: {
                iconUrl: "common/ressource/images/marker-icon.png",
                shadowUrl: "common/ressource/images/marker-shadow.png",
                iconSize: [32, 42],
                shadowSize: [32, 32],
                iconAnchor: [16, 42],
                shadowAnchor: [8, 28]
            },
            jd_icon_custom: {
                iconUrl: "common/img/jdMarkerCustom.png",
                shadowUrl: "common/img/jdMarkerCustomShadow.png",
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
            },
        },
        // Mapviews
        bremen:{
            lat: 53.8,
            lng: 8.3,
            zoom: 8
        },
        ansicht:{
            lat: 0.0,
            lng: 110.0,
            zoom: 3
        },
        // Markers
        markers: {
            // will be populated automatically
        },
        // III. Layers
        layers: {
            baselayers: {
                gray: {
                    name: "Gray",
                    type: "agsBase",
                    layer: "Gray",
                    visible: false
                },
                
                xyz: {
                    name: 'OpenStreetMap (XYZ)',
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    type: 'xyz'
                },
                natGeo: {
                    name: "NationalGeographic",
                    type: "agsBase",
                    layer: "NationalGeographic",
                    visible: false
                },
                oceans: {
                    name: "Oceans",
                    type: "agsBase",
                    layer: "Oceans",
                    visible: false
                },
                shadedrelief: {
                    name: "ShadedRelief",
                    type: "agsBase",
                    layer: "ShadedRelief",
                    visible: false
                },
                
           
            },
            overlays: {
                samples: {
                    name: "Samples",
                    type: "markercluster",
                    visible: true
                },
                editableLayers: {
                    name: "editableLayers",
                    type: "featureGroup",
                    visible: true
                },
              
            },
        }
    });


};