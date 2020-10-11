<?php
include('require/controls.php');
?>
    
<html>
	<head>
		<title>BR</title>
        <link rel="icon" type="image/png" href="img/favicon.png" />
        <link rel="stylesheet" type="text/css" href="css/loc.css">
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <script src="http://code.jquery.com/qunit/qunit-1.11.0.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    </head>
	<body  onload='load()'>
    
	</body>
	<script src="js/Three.js"></script>
	<script src="js/stats.js"></script>
    <script src="js/OrbitControls.js"></script>
    <script src="js/circle-intersection.js"></script>
    <script src="js/BR.js"></script>
    <script src="js/3JS_F.js"></script>
    <script src="js/kalman.js"></script>
	<!-- Loading Image -->
	<div img id="loading"></div>
	<img id="Loading_Image" src='img/favicon.png'></img>
    <iframe name="NoReload" style="display:none;"></iframe>
	<!-- Main Container-->
	<div id="Nav_Container">
        <div class="row">
            <div id="sidebar" class="col-2">
                <table id="data_table">
                    <colgroup>
                        <col width="20%"/>
                        <col width="20%"/>
                        <col width="20%"/>
                        <col width="20%"/>
                        <col width="20%"/>
                    </colgroup>
                    <tr>
                        <td colspan="5"><h1>Info</h1></td>
                    </tr>
                    <tr>
                        <td><h2></h2></td>
                        <td><h2>B5</h2></td>
                        <td><h2>B6</h2></td>
                        <td><h2>B7</h2></td>
                        <td><h2>B8</h2></td>
                    </tr>
                    <tr>
                        <td><h2>RSSI</h2></td>
                        <td id='d5'></td>
                        <td id='d6'></td>
                        <td id='d7'></td>
                        <td id='d8'></td>
                    </tr>
                    <tr>
                        <td><h1>2D</h1></td>
                        <td><h2>X</h2></td>
                        <td id='p_2_x'></td>
                        <td><h2>Y</h2></td>
                        <td id='p_2_y'></td>
                    </tr>
                    <tr>
                        <td><h2>Dist</h2></td>
                        <td id='d_2_1'></td>
                        <td id='d_2_2'></td>
                        <td id='d_2_3'></td>
                        <td id='d_2_4'></td>
                    </tr>
                </table>
                <div class="row Section_Separator"></div>
                <h1>Controls</h1>
        		<div class="row Section_Separator"></div>
                <form action="" method="POST" class="row ControlForms" target="NoReload">
                    <p class="col-12">Scan Status:</p>
                    <div class="col-3"></div>
                    <input name="BR_ScanID" id='ScanID' type="submit" value="OFF" class="col-6 Fire_Apply">
                </form>
        		<div class="row Section_Separator"></div>
                <form action="" method="POST" class="row ControlForms" target="NoReload">
                    <p class="col-12">Iterations (K):</p>
                    <input type="text" name="BR_updIter" class="col-6 Input_Apply" placeholder="">
                    <input name="BR_updIterApp" type="submit" value="Apply" class="col-6 Button_Apply">
                </form>
        		<div class="row Section_Separator"></div>
                <form action="" method="POST" class="row ControlForms" target="NoReload">
                    <p class="col-12">Devices Number:</p>
                    <input type="text" name="BR_updNumb" class="col-6 Input_Apply" placeholder="">
                    <input name="BR_updNumbApply" type="submit" value="Apply" class="col-6 Button_Apply">
                </form>
        		<div class="row Section_Separator"></div>
                <div class="row">
                    <div id="AreaID" class="col-12">
                    </div>
                </div>
            </div>
            <canvas class="col-10 DisplayCanvas" id="Can_2"></canvas>
            </div>
        <div>
		<div class="row Section_Separator"></div>
		<div class="row Section_Footer">
			<div class="col-12 ">
				<p>Copyright &#9400; 2017 Omega Analytic Systems Ltd. All Rights Reserved. See <a href='#'>Disclaimer</a>.</p>
			</div>
		</div>
	</div>
</html>