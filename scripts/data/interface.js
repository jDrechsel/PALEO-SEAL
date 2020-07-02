expandControllerINTERFACE = function($scope, $mdSidenav, $mdDialog, $parse, $http, $filter){

  // SIDENAV ///
    $scope.openSidenav=function(){

        $scope.linksOpen = true;
        $mdSidenav('links').open();
        // console.log("sidenav button clicked...");
    };
    $scope.closeSideNav = function(dieses) {
        if (dieses==='links') {
          $scope.linksOpen = false;
        }
        $mdSidenav(dieses).close();
    };

    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })


  // MODAL // 
  $scope.dialogExport = function(){

    $mdDialog.show({
      templateUrl: 'pages/MODAL_EXPORT.htm',
      clickOutsideToClose:true,
      locals: {proben: $scope.werteALL},
      scope: $scope,
      preserveScope: true,
      bindToController: true,
      controller: function($scope, $mdDialog, proben){
        $scope.werteEXPORT = proben;
        let listeEXPORT = [];
        let listeNOT = [];
        for (var i = 0; i < $scope.werteEXPORT.length; i++){
          if ($scope.werteEXPORT[i].export == true){
            listeEXPORT.push(proben[i].xUID);
          } else {
            listeNOT.push(proben[i].xUID);
          }
        }
        $scope.listeEXPORT=listeEXPORT;
        $scope.listeNOT=listeNOT;


        $scope.dialogExportClose = function(buttonGedruckt){
      
          $mdDialog.hide(buttonGedruckt);
          let listeEXPORT = $scope.listeEXPORT;

        return $scope.listeEXPORT;
      }
      return $scope.listeEXPORT;
    }
    
  })

    .then(function(buttonGedruckt, listeEXPORT){
      if (buttonGedruckt === 'etwas'){
        $scope.SamplesExportieren = function(liste) {
          let listePOST = liste;
          $http({
              method : "POST",
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              url : "scripts/data/datenExportieren.php",
              data: "data=" + JSON.stringify(listePOST),
              async: false
          }).then(function mySuccess(response) {
           $scope.probenExport = response.data;
              let exportDate = new Date();
              let fileName = "PALEOSEALexport_"+ exportDate.toISOString().slice(0,10) +  ".csv";
              saveData($scope.probenExport, fileName);
          }, function myError(response) {
              console.log('Data not loaded! ->', response);
            });     
        };
        $scope.phpResponse=$scope.SamplesExportieren($scope.listeEXPORT);
      
      } else if (buttonGedruckt === 'abbruch'){
        // console.log('Dialog geschlossen!');
      }

    }, function(keinButtongedruckt){
      // console.log('Dialog geschlossen ohne Button!');

    });
  }


  let saveData = (function (){
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
      let exportBlob = new Blob([data], {type: 'text/csv'}),
          url = window.URL.createObjectURL(exportBlob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);

    };
  }());
  $scope.exportArray = $filter('filter')($scope.werteALL, { export: true});
};