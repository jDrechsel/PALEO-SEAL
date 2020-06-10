<!DOCTYPE html>
<html>
    <?php require 'common/head.php'; 
    ?>
    <body ng-app="myApp" ng-controller="myController">
        <!-- NAVBAR --------------------------------------------------------------------->
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">
                            <span><img src="common/img/slccLogo.svg" width="30" height="30" class="d-inline-block align-top" alt=""  color="#616161"></span>
                            PAL SEA LEV IN
                        </a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li><a href="#!">Intro</a></li>
                        <li><a href="#!ChartVIEW">Data Explorer</a></li>
                        <li><a href="#!Map">Map</a></li>
                        <!-- <li><a href="#!AddSample">Add Sample</a></li> -->
                        <!-- <li><a href="#!Login">Login</a></li> -->
                        <li><a href="#!PAGEabout">about</a></li>
                        <!-- <li>{{message}}</li> -->
                    </ul>
                    <div style="float: right;">
                        {{werteENDEXP}}
                        <md-button class="md-raised " ng-click="dialogExport()" style="float: right;">
                            Export
                        </md-button>
                    </div>
                </div>
            </nav>

        <div flex><div ng-view></div></div>

    </body>
</html>