<?php
	$connection = mysqli_connect("138.68.149.142", "root", "CoupE05041966","Login");
	session_start();

	$user_check = $_SESSION['login_user'];
	$sql = mysqli_query($connection,"select username from Users where username='$user_check'");
	$row = mysqli_fetch_assoc($sql);
	$login_session = $row['username'];

	if(!isset($login_session)){
		mysqli_close($connection); // Closing Connection
		header('Location: index.php'); // Redirecting To Home Page
	}
?>