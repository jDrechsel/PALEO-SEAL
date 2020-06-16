expandControllerPLOTsvg = function( $scope, $parse){
    // init plot values viewBox="30 -130 250 150"
    // viewBox="0 -260 600 300"
    // $scope.svgBox_X = 0;
    // $scope.svgBox_Y = -260;
    // $scope.svgBox_dX = 600;
    // $scope.svgBox_dY = 300;

    // $scope.svgScaleX = 0.05;
    // $scope.svgScaleY = 2;
    
    // $scope.staticScaleX = 0.05;
    // $scope.staticScaleY = 2;

    // $scope.svgShiftX = 0;
    // $scope.svgShiftY = 0;

    // $scope.standardErrorX = 200; //[a]
    // $scope.standardErrorY = 4; //[m]

    // let viewBox = [0  -260 600 300]

    // $viewBoxString = `${newViewBox.x} ${newViewBox.y} ${viewBox.width} ${viewBox.height}`;
    // $scope.viewBoxString = `${$scope.svgBox_X} ${$scope.svgBox_Y} ${$scope.svgBox_dX} ${$scope.svgBox_dY}`;
    $scope.viewBoxStringInit = `${$scope.svgBox_X} ${$scope.svgBox_Y} ${$scope.svgBox_dX} ${$scope.svgBox_dY}`;
    console.log("$scope.viewBoxString:",$scope.viewBoxString);
    console.log("document:",document);
    $scope.handlePlot = document.getElementById('#svgPlot');
    console.log("handlePlot:",$scope.handlePlot);
    // let plotElement = angular.element(document.getElementById("svgPlot"));
    // console.log("plot element...>",plotElement);

    // document.getElementById("svgPlot").addEventListener("ondrag", svgPlotPan);
    // angular.element(document.querySelector("svgPlot"));
    function svgPlotPan(){
        console.log("plot dragged...")
    }

    $scope.plotOriginX=0;
    $scope.plotOriginY=0;
    
    //ratio
    // $scope.ratioW = $scope.svgBox_X 

    //scale initial
    let xScaleMin = 0;
    let xScaleMax = 12000;
    $scope.xScaleMax = 12000;
    let yScaleMin = -120;
    let yScaleMax = 20;

    // scale zoomed (min max should change, generate new ticks) svgScaleX
    $scope.xScaleMaxNew = xScaleMax/$scope.svgScaleX;
    $scope.xScaleMinNew = xScaleMin/$scope.svgScaleX;



    let ticksX = [];
    let ticksY = [];
    $scope.ticksF = function(scaleMin, scaleMax, ticksCount, output){
        let i = 0;
        let ticksD = (scaleMax-scaleMin)/ticksCount;
        while (i < ticksCount) {
            output[i] = {tickPos: (scaleMin + i * ticksD)};
            // i=i+ticksD;
            i++;
        }
    };
    $scope.ticksF(xScaleMin, xScaleMax, 10, ticksX);
    $scope.ticksF(yScaleMin, yScaleMax, 7, ticksY);
    $scope.ticksX=ticksX;
    $scope.ticksY=ticksY;
    console.log($scope.ticksX);
    console.log($scope.ticksY);

    $scope.plotClicked=false;


    $scope.plotAction = function(event){
        $scope.plotClicked=true;
        console.log("click", event);
        $scope.dragStart={x: 0, y: 0};
        $scope.dragStart.x= event.clientX;
        $scope.dragStart.y= event.clientY;
       
        console.log("plot mouseDown...", $scope.plotClicked);
        console.log("POS mouseDown...", $scope.dragStart);
        
    };
    $scope.plotMouseUp = function(event){
        $scope.plotClicked=false;
        console.log("plot mouseDown...", $scope.plotClicked);
        $scope.dragStop={x: 0, y: 0};
        $scope.dragStop.x= event.clientX;
        $scope.dragStop.y= event.clientY;
        $scope.dragDist={x: 0, y: 0};
        $scope.dragDist.x = $scope.dragStop.x -$scope.dragStart.x;
        $scope.dragDist.y = $scope.dragStop.y -$scope.dragStart.y;

        $scope.svgShiftX = $scope.dragDist.x;
        $scope.svgShiftY = $scope.dragDist.y;
        console.log("plot mouseUP...", $scope.dragDist);
        // Update ViewBox
        $scope.svgBox_X = $scope.svgBox_X-($scope.dragDist.x);
        $scope.svgBox_Y = $scope.svgBox_Y+($scope.dragDist.y);
        // $scope.viewBoxString = `${$scope.svgBox_X} ${$scope.svgBox_Y} ${$scope.svgBox_dX} ${$scope.svgBox_dY}`;
        // Update Axis
        $scope.updatePlot();

    };
    $scope.updatePlot = function(){
        if ($scope.plotClicked==true){
            $scope.dragDist.x = $scope.dragStop.x -$scope.dragStart.x;
            $scope.dragDist.y = $scope.dragStop.y -$scope.dragStart.y;

            $scope.svgShiftX = $scope.dragDist.x;
            $scope.svgShiftY = $scope.dragDist.y;
        }
    };
    $scope.updatePlot();
    
    $scope.plotPosition = function(event){
        if ($scope.plotClicked==true){
            let point = {x:0, y:0};
            point.x = event.clientX;
            point.y = event.clientY;
            // console.log("plot mouseMove...", event);
            // console.log("plot mouseMove..>", point);
        }
            
        };
    // calculate plot extents from max min (group)

    // zoom functions
    $scope.ZoomSvgOut = function(){
        console.log($scope.svgScaleX);
        $scope.svgScaleX = $scope.svgScaleX-0.005;
        $scope.svgScaleY= $scope.svgScaleY - 0.5;
        console.log(event);
        // $scope.svgZoomX=$scope.svgScaleX/$scope.staticScaleX;
        // // if ($scope.svgZoomX < 0 ){
        // // }
        // $scope.svgZoomX=$scope.svgScaleX/$scope.staticScaleX;
    };    
    $scope.ZoomSvgIn = function(){
        console.log($scope.svgScaleX);
        $scope.svgScaleX = $scope.svgScaleX+0.005;
        $scope.svgScaleY= $scope.svgScaleY + 0.5;
        console.log($scope.svgScaleX);
        // $scope.svgZoomX=$scope.svgScaleX/$scope.staticScaleX;
        // // if ($scope.svgZoomX < 0 ){
        // // }
        // $scope.svgZoomX=$scope.svgScaleX/$scope.staticScaleX;
    };    
    // Axis configuration

    // Select from plot (set export: true)
    $scope.plotSelectExport= function(){

    };
    $scope.scrollToSample = function(sampleID){
        let supelemnt=document.getElementsByClassName("myFocus");
        for (i=0; i < supelemnt.length; i++){
            supelemnt[i].className= "sampleTable"
        }
        console.log("supelemnt",supelemnt);
        console.log("supelemnt",supelemnt.classList);
        // document.getElementsByClassName("myFocus").classList.remove('myFocus');
        // console.log("clicked: sample ID ->", sampleID);
        let elemnt=document.getElementById(sampleID );
        elemnt.classList.add('myFocus');
        elemnt.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // elemnt.style.color = "red";
        // console.log(elemnt);
        // elemnt.classList.remove('myFocus');

    }

    $scope.calculateRenderBoundary = function(){
        // get X min max 
        // 

        // get Y min max
    };

    function convertToPlotCoords(x, y){
        let plotX=x*$scope.svgBox_dX/$scope.xScaleMax;
        let plotY=y*$scope.svgBox_dY/$scope.yScaleMax;
        return plotX, plotY;
    }
}; //endof Expander