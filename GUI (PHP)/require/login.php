<?php
    session_start(); // Starting Session
    $error=''; // Variable To Store Error Message
    if (isset($_POST['submit'])) {
        if (empty($_POST['username']) || empty($_POST['password'])) {
            $error = "Username or Password is invalid";
        }
        else
        {
            // Define $username and $password
            $username=$_POST['username'];
            $password=$_POST['password'];

            // Establishing Connection with Server by passing server_name, user_id and password as a parameter
            $connection = mysqli_connect("138.68.149.142", "root", "CoupE05041966", "Login") or die(mysqli_connect_errno());

            // To protect MySQL injection for Security purpose
            $username = stripslashes($username);
            $password = stripslashes($password);
            $username = mysqli_real_escape_string($connection,$username);
            $password = mysqli_real_escape_string($connection,$password);

            // SQL query to fetch information of registerd users and finds user match.
            $query = "SELECT * FROM Users WHERE password='$password' AND username='$username'";
            $check = mysqli_query($connection, $query);
            $rows = mysqli_num_rows($check);

        if ($rows == 1) {
            $_SESSION['login_user']=$username; // Initializing Session
            header("location: LOC.php"); // Redirecting To Other Page
        } else {
            $error = "Username or Password is invalid";
        }
            mysql_close($connection); // Closing Connection
        }
    }
?>