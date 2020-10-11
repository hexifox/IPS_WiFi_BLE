<?php
	//include('require/session.php');
?>
<!DOCTYPE html>
<!--
* Omega Analytics Systems Ltd.
* Copyright © 2017 Omega Analytics Systems Ltd.
* All rights reserved.
-->
<html>
<head>
	<title>LOC</title>
	<link rel="icon" type="image/png" href="img/favicon.png" />
	<script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="https://dl.dropboxusercontent.com/u/1131693/bloodrop/sylvester.js"></script>
	
	<script src="js/getData.js"></script>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body onload='start()'>
	<div id="Header">
		<img src="img/user.png" id="User_Logo">
		<div id="User">
		<pre>
Welcome, <i><?php echo $login_session; ?></i>
Last Login: 14/01/16
<a href="require/logout.php">Log Out</a></pre>
		</div>
		<img src="img/Omega.png" id="OAS_Logo">
		<div id="HoursMinutes"> </div>
		<div id="DayMonth"> </div>
	</div>

	<div id="Container">
		<div id="QuickControls">
			<h1>Data</h1>
			<i id="InfoTab"></i>
			<i id="PosTab"></i>
		</div>
		<div id="Main">
			<canvas height="1000" width="1600" id="board"></canvas>
		</div>

		<div id="SideBar">
			<h1>Actions</h1>
				<form action="" method="POST">
					<input name="circles" type="button" value="circles" class="ApplyButton SoloButtons" class="SoloButtons" onclick="plotObjCircles(OA1_Obj,OA2_Obj,OA3_Obj,OA1_OA2,OA1_OA3)">
					<br>
				</form>
			
			<h1>Info</h1>
				<p>Developed by Omega Security Systems.</p>
				<br>
				<p>Powered by Raspberry Pi.</p>
		</div>
		<footer>
			<p>Copyright © 2017 Omega Analytic Systems Ltd. All Rights Reserved. See <a href='#'>Disclaimer</a>.</p>
		</footer>
	</div>
<script src="js/main.js" type="text/javascript"></script>
<script src="js/kalman.js" type="text/javascript"></script>
</body>
</html>