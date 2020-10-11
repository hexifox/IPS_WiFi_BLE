<?php
include('require/controls.php');
?>
    

<html>
	<head>
		<title>LOC</title>
        <link rel="icon" type="image/png" href="img/favicon.png" />
        <link rel="stylesheet" type="text/css" href="css/loc.css">
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <script src="http://code.jquery.com/qunit/qunit-1.11.0.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    </head>
	<body  onload='load()'>
	<script src="js/Three.js"></script>
	<script src="js/stats.js"></script>
	<script src="js/OrbitControls.js"></script>
	<script src="js/circle-intersection.js"></script>
	<script src="js/MR.js"></script>
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
                        <td colspan="5"><h1>Info - Dist</h1></td>
                    </tr>
                    <tr>
                        <td><h2></h2></td>
                        <td><h2>B1</h2></td>
                        <td><h2>B2</h2></td>
                        <td><h2>B3</h2></td>
                        <td><h2>B4</h2></td>
                    </tr>
                    <tr>
                        <td><h2>D1</h2></td>
                        <td id='Dev1_5'></td>
                        <td id='Dev1_6'></td>
                        <td id='Dev1_7'></td>
                        <td id='Dev1_8'></td>
                    </tr>
                    <tr>
                        <td><h2>D2</h2></td>
                        <td id='Dev2_5'></td>
                        <td id='Dev2_6'></td>
                        <td id='Dev2_7'></td>
                        <td id='Dev2_8'></td>
                    </tr>
                    <tr>
                        <td><h2>D3</h2></td>
                        <td id='Dev3_5'></td>
                        <td id='Dev3_6'></td>
                        <td id='Dev3_7'></td>
                        <td id='Dev3_8'></td>
                    </tr>
                    <tr>
                        <td colspan="5"><h1>Points (3D)</h1></td>
                    </tr>
                    <tr>
                        <td><h2></h2></td>
                        <td colspan="2"><h2>Color</h2></td>
                        <td colspan="2"><h2>Room</h2></td>
                    </tr>
                    <tr>
                        <td><h2>D1</h2></td>
                        <td colspan="2" id='Dev1_11'></td>
                        <td colspan="2" id='Dev1_12'></td>
                    </tr>
                    <tr>
                        <td><h2>D2</h2></td>
                        <td colspan="2" id='Dev2_11'></td>
                        <td colspan="2" id='Dev2_12'></td>
                    </tr>
                    <tr>
                        <td><h2>D3</h2></td>
                        <td colspan="2" id='Dev3_11'></td>
                        <td colspan="2" id='Dev3_12'></td>
                    </tr>
                </table>
                <div class="row Section_Separator"></div>
                <h1>Controls</h1>
        		<div class="row Section_Separator"></div>
                <form action="" method="POST" class="row ControlForms" target="NoReload">
                    <p class="col-12">Scan Status:</p>
                    <div class="col-3"></div>
                    <input name="MR_ScanID" id='ScanID' type="submit" value="OFF" class="col-6 Fire_Apply">
                </form>
        		<div class="row Section_Separator"></div>
                <form action="" method="POST" class="row ControlForms" target="NoReload">
                    <p class="col-12">Iterations (K):</p>
                    <input type="text" name="MR_updIter" class="col-6 Input_Apply" placeholder="">
                    <input name="MR_updIterApp" type="submit" value="Apply" class="col-6 Button_Apply">
                </form>
        		<div class="row Section_Separator"></div>
                <form action="" method="POST" class="row ControlForms" target="NoReload">
                    <p class="col-12">Devices Number:</p>
                    <input type="text" name="MR_updNumb" class="col-6 Input_Apply" placeholder="">
                    <input name="MR_updNumbApply" type="submit" value="Apply" class="col-6 Button_Apply">
                </form>
        		<div class="row Section_Separator"></div>
                <div class="row">
                    <div id="AreaID" class="col-12">
                    </div>
                </div>
            </div>
            <div class="col-10 DisplayCanvas" id="3DCanvas">
            </div>
        <div>
		<div class="row Section_Separator"></div>
		<div class="row Section_Footer">
			<div class="col-12 ">
				<p>Copyright &#9400; 2017 Omega Analytic Systems Ltd. All Rights Reserved. See <a href='#'>Disclaimer</a>.</p>
			</div>
		</div>
	</div>
	</body>
</html>