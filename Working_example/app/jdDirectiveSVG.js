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

myApp.directive('jdDirectiveSvg', function() {

        return {
          restrict: 'E',
          replace: true,
          transclude: true,
          templateUrl : function(scope,  attrs){
            if (attrs.template == "dialog"){
            return "pages/svgPlotTemplateExport.htm";
            } else {
              return "pages/svgPlotTemplate.htm";
            }
           
          },



        };
});

