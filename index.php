<!DOCTYPE html>
<html>
    <?php require 'common/head.php'?>
    <body ng-app="myApp" ng-controller="myController">
        <!-- NAVBAR --------------------------------------------------------------------->
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">
                            <img src="common/img/Logo.svg" height="40vh"  alt="PALEO SEAL"  color="#616161">
                        </a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li><a href="#!">Intro</a></li>
                        <li><a href="#!ChartVIEW">Data Explorer</a></li>
                        <li><a href="#!Map">Map</a></li>
                        <li><a href="#!PAGEabout">About</a></li>
                    </ul>
                    <div style="float: right;">
                        <!-- {{exportLength}} -->
                        <md-button class="md-raised " ng-click="dialogExport()" style="float: right;">
                            Export
                        </md-button>
                    </div>
                </div>
            </nav>

        <div flex><div ng-view></div></div>

    </body>
</html>