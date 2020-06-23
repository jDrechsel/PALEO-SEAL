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
          restrict: 'E',
          replace: true,
          transclude: true,
          // scope: {
          //   daten: '=',
          //   plotfilter: '='
          // },
          // templateUrl : "pages/svgPlotTemplate.htm",
          templateUrl : function(scope,  attrs){
            console.log("tepmateURL ATTRs",attrs.template);
            if (attrs.template == "dialog"){
            return "pages/svgPlotTemplateExport.htm";
            } else {
              return "pages/svgPlotTemplate.htm";
            }
           
          },//"pages/svgPlotTemplate.htm",
          // link: function(scope, element, attrs){
          //   console.log("Directive Attrs: ", attrs);
          //   if (attrs.template == "dialog"){
          //     console.log("Dialogue template")
          //   }
          // }
          



        };
});

