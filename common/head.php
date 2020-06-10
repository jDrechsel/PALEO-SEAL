<head>
    <!-- Here All libraries necessary have to be loaded:                                -->
    <!-- AngularJS and dependencies (jQuery)                                            -->
    <!-- Bootstrap                                                                      -->
    <!-- Leaflet Angular leaflet and Esri Basemaps                                      -->
    <!-- D3 (+ NVD3 or other possibilities to Implement custom plots)                   -->
    <meta name="viewport" charset="utf-8">
    <!-- TITLE & ICONS                                                                  -->
    <title>PalSeaLevIn 2</title>
    <link rel="icon" href="common/img/slccLogo.svg" type="image/ico">

    <!-- CSS Styles                                                                     -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.21/angular-material.css" integrity="sha256-xAan9ZNylg0LT1xAHn8Qkpr8b+VSo3PmPEPjhn9ecak=" crossorigin="anonymous" />    
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.0/leaflet.css" integrity="sha256-SHMGCYmST46SoyGgo4YR/9AlK1vf3ff84Aq9yK4hdqM=" crossorigin="anonymous" /> -->
    <link rel="stylesheet" href="common/ressource/leaflet.css">
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/leaflet.css" integrity="sha256-SHMGCYmST46SoyGgo4YR/9AlK1vf3ff84Aq9yK4hdqM=" crossorigin="" /> -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/MarkerCluster.css" integrity="sha256-+bdWuWOXMFkX0v9Cvr3OWClPiYefDQz9GGZP/7xZxdc=" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/MarkerCluster.Default.css" integrity="sha256-LWhzWaQGZRsWFrrJxg+6Zn8TT84k0/trtiHBc6qcGpY=" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" integrity="sha256-XzD3RpaHPv7lzX9qt+2n1j5cWj48O24KsgaGYpKN8x8=" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha384-pdapHxIh7EYuwy6K7iE41uXVxGCXY0sAjBzaElYGJUrzwodck3Lx6IE2lA0rFREo" crossorigin="anonymous">
    <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"> -->
    <!-- LOCAL CSS Styles -->
    <!-- <link rel="stylesheet" href="common/css/bootstrap.css"> -->
    <!-- <link rel="stylesheet" href="common/css/nv.d3.css"> -->
    <link rel="stylesheet" href="common/ressource/locationfilter.css">
   

    
    <!-- CUSTOM CSS Styles -->
    <link rel="stylesheet" href="common/css/appearance.css">
    <link rel="stylesheet" href="common/css/plotSvgStyle.css">
    <!-- <link rel="stylesheet" href="common/css/style.css"> -->
   
    <!-- jQUery (old version: 3.2.1) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js" integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js" integrity="sha256-4iQZ6BVL4qNKlQ27TExEhBN1HFPvAvAMbFavKKosSWQ=" crossorigin="anonymous"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js" integrity="sha256-VeNaFBVDhoX3H+gJ37DpT/nTuZTdjYro9yBruHjVmoQ=" crossorigin="anonymous"></script> -->
    <!-- AngularJS  1.7.9-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.7.9/angular.min.js" integrity="sha256-b5NvmvUcyr0wpBOLnNbaWH5zKQAivhj8yMYhfXEumQA=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-route/1.7.9/angular-route.js" integrity="sha256-FzAcCK5e50MA39uM3vxh1fNyBhf+U4+e9cuCFp+o7tY=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-messages/1.7.9/angular-messages.min.js" integrity="sha256-AdbPcAJ7xwaTeBZuq+dDME+IsMMO+ZGpvDnJxpD0GO8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-animate/1.7.9/angular-animate.min.js" integrity="sha256-4Am33FY45kRUTsiTIMaIc7t10JBmM6ybI/SYqNcMxsQ=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-aria/1.7.9/angular-aria.min.js" integrity="sha256-J9qjrqGdu02DiEwyoluAIeP548sJVj3Xq/n/g3yxbgY=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-filter/0.5.17/angular-filter.min.js" integrity="sha256-CCbnZJ4lPY1crod3VTMaag/SdyHrW7lYW7PI9MPzBMY=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-simple-logger/0.1.7/angular-simple-logger.min.js" integrity="sha256-pCSPFdd2xTyAjqQUAaN4amj+x4uAeTpn3Qly6nfXrxk=" crossorigin="anonymous"></script>
    <!-- AngularJS  1.6.9-->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.9/angular.min.js" integrity="sha256-7ngBGhPctUEyXLD6ha53TFUaqhBCnXFOi712aqBq094=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.9/angular-route.min.js" integrity="sha256-MZn3qSbJC3ofkTSdXaHYrPr5etI6xij07/pAK6Ug228=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.9/angular-messages.min.js" integrity="sha256-S/1YUENQ1XrFNTpjjBEGdknAmnulVAldPODX7UTQlkk=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.9/angular-animate.min.js" integrity="sha256-R9+lzfWzgYztpoCcYVdGCr4RI1uX8CgGibodv/kI6xA=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.9/angular-aria.min.js" integrity="sha256-klGCpRWrNPWFAa1voQB1QKrpGJItV5dO42GQ9pe+gJg=" crossorigin="anonymous"></script> -->
   
    <!-- BOOTstrap and Angular materials                                                -->
    <!-- NOTE: BS version 3.3.5 was used in older version (if problmematic, roll back)  -->
    <!-- <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.4.0/umd/popper.min.js" integrity="sha256-FT/LokHAO3u6YAZv6/EKb7f2e0wXY3Ff/9Ww5NzT+Bk=" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" integrity="sha384-pPttEvTHTuUJ9L2kCoMnNqCRcaMPMVMsWVO+RLaaaYDmfSP5//dP6eKRusbPcqhZ" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.21/angular-material.js" integrity="sha256-Uk5iHezxUUT4qfG6dZpwxE0+rNvWXWv3cg7wqzo9EnE=" crossorigin="anonymous"></script>

    <!-- D3 STUFF -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js" integrity="sha256-dsOXGNHAo/syFnazt+KTBsCQeRmlcW1XKL0bCK4Baec=" crossorigin="anonymous"></script> -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.6/nv.d3.min.js" integrity="sha256-Eg29ohiE9Hzc/t5whG/QK/B8MGmrO4wkF6WGuSsx0VU=" crossorigin="anonymous"></script> -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-nvd3/1.0.9/angular-nvd3.min.js" integrity="sha256-PAY8BCwt+idlG8V+2fyooEUzQ+ENaY9RCe9/Z9xn0nM=" crossorigin="anonymous"></script> -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/angularjs-nvd3-directives/0.0.8/angularjs-nvd3-directives.min.js" integrity="sha256-GceswGhH88BCxRJ6f0McAlxm0S9qNmdlw22RibTLK+8=" crossorigin="anonymous"></script> -->


    <!-- LEAFLET STUFF -->
    <!-- <script src="common/ressource/leaflet.js"></script> -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.0/leaflet.js" integrity="sha256-EHfF/y1moxl+oORWk63Uefp3BLR137civWxEblmKafA=" crossorigin="anonymous"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/leaflet.js" integrity="sha256-fNoRrwkP2GuYPbNSJmMJOCyfRB2DhPQe0rGTgzRsyso=" crossorigin=""></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/esri-leaflet/2.4.1/esri-leaflet.js" integrity="sha256-JVHq2WcmQ/nFEwcSsAInbB749vpBnyZKbBDn/vPRzRw=" crossorigin="anonymous"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/esri-leaflet/2.3.3/esri-leaflet.js" integrity="sha256-Y1CrRl9cFSxLcaxsgdx8Q30dRYYoz679i8XVr71M0Kk=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ui-leaflet/2.0.0/ui-leaflet.min.js" integrity="sha256-5LHZeeI8VUdPcORIXLzmLXGRc9h9oKUWe+VEkqGsJXU=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-leaflet-directive/0.10.0/angular-leaflet-directive.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js" integrity="sha256-siofc4Uwjlra3YWkwthOn8Uj69cNN4aMug/iOHNiRgs=" crossorigin="anonymous"></script>

    <!-- ADDITIONAL LEAFLET STUFF  -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/leaflet.markercluster.js" integrity="sha256-WL6HHfYfbFEkZOFdsJQeY7lJG/E5airjvqbznghUzRw=" crossorigin="anonymous"></script>
    <!-- <script src="common/ressource/locationfilter.js"></script> -->
    <!-- <script src='https://unpkg.com/@turf/turf/turf.min.js'></script> -->
    <!-- LOAD CUSTOM SCRIPTS -->
    <script src="app/app.js"></script>
    <script src="app/myController.js"></script>
    <script src="app/myDirectives.js"></script>
    <script src="app/jdDirectiveSVG.js"></script>
    <!-- <script src="app/angular-d3v4.js" type="text/javascript"></script> -->

    <script src="scripts/data/initialize.js"></script>
    <script src="scripts/data/interface.js"></script>
    <script src="scripts/data/getData.js"></script>
    <script src="scripts/data/generalFunctions.js"></script>
    <script src="scripts/maps/map_options.js"></script>
    <script src="scripts/maps/map_functions.js"></script>
    <script src="scripts/plots/plot_options.js"></script>
    <script src="scripts/plots/plot_functions.js"></script>
    <script src="scripts/plots/plot_svg_options.js"></script>
    <script src="scripts/plots/plot_svg_functions.js"></script>

</head>

