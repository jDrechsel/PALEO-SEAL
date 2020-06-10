expandControllerMAP = function($scope){
    /*
    Initial Setup for map
    I.       Custom Markers
    II.      inital markers
    III.     Base layers (ESRI)
    */
    //    L.Icon.Default.imagePath='common/ressource/images/' 

    // var myIcon = L.icon({
    //     iconUrl: 'common/img/jdMarkerCustom.png',
    //     iconSize: [38, 95],
    //     iconAnchor: [22, 94],
    //     popupAnchor: [-3, -76],
    //     shadowUrl: 'common/img/jdMarkerCustomShadow.png',
    //     shadowSize: [68, 95],
    //     shadowAnchor: [22, 94]
    // });
    // L.Marker.prototype.options.icon=myIcon;
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
    // angular.extend($scope, {
    //     icons: local_icons
    // });
    // II.
    // let editableLayers = new L.featureGroup();
    // map.addLayer(editableLayers);
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
                    
                    
                    // toolbar: {
                        //     buttons: {
                            //         rectangle: "Draw a rectangle2"
                            //     }
                            // }
                },
                // edit: {
                //     featureGroup: editableLayers, //REQUIRED!!
                //     remove: false
                // }
            },
            // edit: {
            //     featureGroup: editableLayers,
            //     remove: true
            // }
        },
        // Icons
        icons: {//local_icons, //-> [!] obsolete, but would be awesome if it could be declared here
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
            // marum:{
            //     lat: 53.110227,
            //     lng: 8.850871,
            //     layer: "institutes",
            //     icon: local_icons.jd_icon_marum,
            //     message: "Marum - Zentrum für Marine Umweltwissenschaften"
            // },
            // slcc:{
            //     lat: 53.109061, 
            //     lng: 8.850084,
            //     layer: "institutes",
            //     icon: local_icons.jd_icon_slcc,
            //     message: "SLCC - Sea Level and Coastal Changes group @ Marum"
            // },
            // m1: {
            //     lat: 4.649,
            //     lng: -74.086,
            //     icon: local_icons.jd_icon_custom,

            // },
            // m2: {
            //     lat: 53.8,
            //     lng: 8.3,
            //     layer: "germany",
            //     icon: local_icons.jd_icon_custom,

            // },
            // m3: {
            //     lat: 53.83,
            //     lng: 8.32,
            //     layer: "germany",
            //     icon: local_icons.jd_icon_custom,

            // },
            // m4: {
            //     lat: 53.79,
            //     lng: 8.29,
            //     layer: "germany",
            //     icon: local_icons.jd_icon_custom,

            // },
            // m5: {
            //     lat: 53.8,
            //     lng: 8.27,
            //     layer: "germany",
            //     icon: local_icons.jd_icon_custom,

            // }
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