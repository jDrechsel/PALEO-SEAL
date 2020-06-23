expandControllerINTERFACE = function($scope, $mdSidenav, $mdDialog, $parse, $http){
  // initial view
  $scope.sortierung2="Region";
  
  // initialize groups:
  // $scope.groupBy( 'region', 'Region' );
  
  
  
  // SIDENAV ///
    $scope.openSidenav=function(){

        $scope.linksOpen = true;
        $mdSidenav('links').open();
        // $mdSidenav('rechts').open();
        console.log("sidenav button clicked...");
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
    // var newScope = $scope.$new();

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
        // $scope.werteEXPORT = function(){
        for (var i = 0; i < $scope.werteEXPORT.length; i++){
          console.log("$scope.werteEXP.export: ", $scope.werteEXPORT[i].export);
          if ($scope.werteEXPORT[i].export == true){
            listeEXPORT.push(proben[i].xUID);
          } else {
            listeNOT.push(proben[i].xUID);
          }
        }
        $scope.listeEXPORT=listeEXPORT;
        $scope.listeNOT=listeNOT;
        console.log('>>> [X] Export Dialog');
        console.log('>>> [X] $scope.werteEXPORT', $scope.werteEXPORT);
        console.log('>>> [X] $scope.listeEXPORT', $scope.listeEXPORT);
        console.log('>>> [X] $scope.listeNOT', $scope.listeNOT);
        // console.log('>>> [X] proben', proben);

        $scope.dialogExportClose = function(buttonGedruckt){
      
          $mdDialog.hide(buttonGedruckt);
          let listeEXPORT = $scope.listeEXPORT;
        //   function passVal(dataExport){
        //     $.post("scripts/data/datenExportieren.php", {"list4export": dataExport});
        //   }
        //  passVal(listeEXPORT);
        console.log("listeExport: 1", $scope.listeEXPORT);
        return $scope.listeEXPORT;
      }
      console.log("listeExport: 2", $scope.listeEXPORT);
      return $scope.listeEXPORT;
    }
    
  })
  // .then(function(response){
    //   console.log("$export-response:",response);
    //   console.log("listeExport(before POST1):",listeEXPORT);
    
    // })
    .then(function(buttonGedruckt, listeEXPORT){
      console.log("listeExport: 3", $scope.listeEXPORT, $scope.listeEXPORT.length);
        console.log("buuton gedrueckt:",buttonGedruckt);
        console.log("btn etwas-> $scope:",$scope);
        console.log("btn etwas-> $sc.listeExp:",$scope.listeEXPORT);
      if (buttonGedruckt === 'etwas'){
        $scope.SamplesExportieren = function(liste) {
          let listePOST = liste;
          $http({
              method : "POST",
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              // headers: {'Content-Type': 'text/csv; charset=utf-8','Content-Disposition': 'attachment;filename="$filename.csv"'},
              // header('Content-Type: text/csv; charset=utf-8');
              // header('Content-Disposition: attachment;filename="$filename.csv"');
              url : "scripts/data/datenExportieren.php",
              data: "data=" + JSON.stringify(listePOST),
              async: false
          }).then(function mySuccess(response) {
           $scope.probenExport = response.data;
              // console.log('Daten fuer Export PHP response:',response);
              // console.log('Daten fuer Export PHP response.data:',response.data);
              // console.log('Daten fuer Export PHP response.config.data:',response.config.data);
              // console.log("$scope.probenExport: ", $scope.probenExport);
              let exportBlob = new Blob([$scope.probenExport], {type: 'text/csv'});
              // date("Y-m-d_H_i_s")+
              let exportDate = new Date();
              let fileName = "PALEOSEALexport_"+ exportDate.toISOString().slice(0,10) +  ".csv";
              console.log("exportBlob: ", exportBlob);
              saveData($scope.probenExport, fileName);
          }, function myError(response) {
              console.log('Daten NICHT geladen', response);
            });     
        };
        console.log("Connect to DB retreive all marked records")
        $scope.phpResponse=$scope.SamplesExportieren($scope.listeEXPORT);
      //   function passVal(dataExport){
      //     $.post("scripts/data/datenExportieren.php", {"list4export": dataExport});
      //   }
      //  passVal($scope.listeEXPORT);
        console.log("Connect to DB retreive all marked records")
        // function: get DB records based on xUIDs in selection
        console.log("$scope.listeExport(before POST2):",$scope.listeEXPORT);
        // $scope.getFullRecords($scope.listeEXPORT);
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Done!')
            .textContent('Generated CSV!')
            .ok('OK')
        );
      } else if (buttonGedruckt === 'abbruch'){
        console.log('Dialog geschlossen!');
      }

    }, function(keinButtongedruckt){
      console.log('Dialog geschlossen ohne Button!');

    });
  }

  // mark for export in werteALL
  $scope.markForExport = function(sample){
    console.log("m4ex: ", sample);
    
  }
  let saveData = (function (){
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
      let exportBlob = new Blob([$scope.probenExport], {type: 'text/csv'}),
          url = window.URL.createObjectURL(exportBlob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);

    };
  }());
  // $scope.getFullRecord = function(){
  //   // $scope.ExportListFinal=$filter('filter')($scope.werteEXPORT, {export=true})
  //   $scope.ExportListFinal=$scope.werteEXPORT.filter(function(proben){
  //     return (proben.export == true)
  //   });

  //   console.log("get full Records");
  //   console.log("get full Records: ", $scope.ExportListFinal);
  // }
};