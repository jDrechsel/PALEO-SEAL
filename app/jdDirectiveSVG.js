/* 
    Custom directive to render paleo sealevel data as proposed in Khan et al (2017)


    Author: Jan Drechsel
    Created: 2020-06-04
*/

/*
    Functionalities:
      3 different marker types depending on indicator type (filter or define each dataset individually)
      conditional formatting: e.g. 
          show markers based on criteria (plot === true, comes in handy for export=== true -> reusability)
          highlight markers marked for export in plot view, not export view
*/
/* 
    NOTES:
      input attributes?

      integrate or connect table?

    ## General Plot functionality:
      Pan zoom fixed axis (purge viewbox idea, calculate)
        overlay (passepartout) to hide markers out of extent?

      Legend? 
*/

myApp.directive('jdDirectiveSvg', function() {
        // return function(scope, element, attrs) {
  
        // };
        return {
          // scope: {
          //   daten: '=',
          //   plotfilter: '='
          // },
          templateUrl : "pages/svgPlotTemplate.htm"
          



        };
});

