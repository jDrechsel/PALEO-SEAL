var myApp = angular.module('myApp', ["ngRoute","ngMaterial", "leaflet-directive"]);
// , "ngMaterial"
    myApp.config(function($routeProvider){
        $routeProvider
	    .when("/", {
	        templateUrl : "pages/PAGE_INTRO.htm"
	    })
	    .when("/ChartVIEW", {
	        templateUrl : "pages/PAGE_EXPLORER.htm"
	    })
	    .when("/AddSample", {
	        templateUrl : "pages/PAGE_ADDSAMPLE.htm"
	    })
	    .when("/Map", {
	        templateUrl : "pages/PAGE_MAP.htm"
	    })
	    .when("/PAGEabout", {
	        templateUrl : "pages/PAGE_ABOUT.htm"
	    });
    });