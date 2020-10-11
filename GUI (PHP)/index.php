<?php
include('require/login.php'); // Includes Login Script

if(isset($_SESSION['login_user'])){
header("location: OAC.php");
}  
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Login</title>
		<link rel="stylesheet" type="text/css" href="css/login.css">
	</head>
	<body id="bg" onload="startTime()">
		<div id="header">
				<img src="img/SA_62.png" id="SA_Logo">
				<img src="img/Omega.png" id="OAS_Logo">
				<div id="HoursMinutes"> </div>
				<div id="DayMonth"> </div>
		</div>
			<form action="" id="form" method="post">
				<div class="Ins">
					<img src="img/User.png" class="Login_Logos">
					<input id="name" name="username" type="text" placeholder="Username" class="Inputs">
				</div>
				<div class="Ins">
					<img src="img/Key.png" class="Login_Logos">
					<input id="password" name="password" type="password" placeholder="Password" class="Inputs">
				</div>
				<div class="Ins">
					<input name="submit" type="submit" value="Log In" id="Input"> 
				</div>
			</form>
	</body>
	<script>
		//Recurring Function (60 seconds)
		function startTime() {
			var today = new Date();
			var hours = today.getHours();
			var minutes = today.getMinutes();
			minutes = minutes < 10 ? '0'+minutes : minutes;
			var ampm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12;
			hours = hours ? hours :12;
			var day = today.getDate();
			var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
			var weekday = days[today.getDay()];
			var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
			var month = months[today.getMonth()];
			var year = today.getFullYear();
			//Display time in hh:ss AM-PM format 
			document.getElementById('HoursMinutes').innerHTML = hours + ':' + minutes + ' ' + ampm; 
			//Display date in "Day #, Month Year"  format
			document.getElementById('DayMonth').innerHTML = weekday + ' ' + day + ', ' + month + ' ' + year;
			//Restart 60 seconds later
			var restartTime = setTimeout(startTime, 60000);
		}
	</script>
</html>