expandControllerPLOTsvgOPT = function( $scope, $parse){
    // vscode://file/C:/xampp/htdocs/SeaLevelInterface/common/css/appearance.css:92:1
    $scope.yAxisLabel="Elevation [m RSL]"
    $scope.xAxisLabel="Age [a BP]"

    // SVG Dimensions ("canvas Size, margins, etc")
    $scope.svgBox_X = 0;
    $scope.svgBox_Y = -250;
    $scope.svgBox_dX = 600;
    $scope.svgBox_dY = 250;
    
    // margins
    $scope.marginAxisY = 30;
    $scope.marginAxisX = 20;

    // axis positions
    $scope.posAxisX = -120; // y value of xAxis (in plot dimensions!; here: m msl)
    $scope.posAxisY = 0;    // x value of yAxis (unchanged)

    // calculate viewbox shift (easier to control markers) 1.5times since right margin has to be smaller, no labels etc
    $scope.svgBox_Xmargins = $scope.svgBox_X-$scope.marginAxisY;
    $scope.svgBox_Ymargins = $scope.svgBox_Y-$scope.marginAxisX;
    $scope.svgBox_dXmargins = $scope.svgBox_dX+1.5*$scope.marginAxisY;
    $scope.svgBox_dYmargins = $scope.svgBox_dY+1.5*$scope.marginAxisX;
    
    $scope.viewBoxString = `${$scope.svgBox_Xmargins} ${$scope.svgBox_Ymargins} ${$scope.svgBox_dXmargins} ${$scope.svgBox_dYmargins}`;

    $scope.staticScaleX = 0.05;
    $scope.staticScaleY = 2;

    // dynamic svg parameters
    $scope.svgScaleX = 0.05;
    $scope.svgScaleY = 2;
    
    $scope.svgShiftX = 0;
    $scope.svgShiftY = 0;

    // doenat update?!? (isnt changed on dom fncts)
    $scope.svgZoomX=$scope.svgScaleX/$scope.staticScaleX;
    $scope.svgZoomY=$scope.svgScaleY/$scope.staticScaleY;

    // Plot Dimensions 
    $scope.xScaleMin = 0;
    $scope.xScaleMax = 12000;
    $scope.yScaleMin = -120;
    $scope.yScaleMax = 10;


    $scope.standardErrorX = 200; //[a]
    $scope.standardErrorY = 4; //[m]

    // Plot visibility toggler
    $scope.showRejected = false;
    $scope.linkTable = true;
    $scope.showPlotControl = false;

}; //endof Expander