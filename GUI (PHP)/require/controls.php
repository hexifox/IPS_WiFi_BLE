<!--
* Omega Analytics Systems Ltd.
* Copyright © 2017 Omega Analytics Systems Ltd.
* All rights reserved.
-->
<?php
//Scan Update MR_
if (isset($_POST['DR_ScanID'])) {
	$cnx = mysqli_connect("localhost", "root", "CoupE05041966","ACT"); #Cloud testing address: 138.68.149.142
	if(!$cnx){
		die("Connection failed: " . mysqli_connect_error());
	}
	$sql = "SELECT * FROM LOC_Config WHERE C_Name='DR'";
	$result = mysqli_query($cnx, $sql);
	while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
		$Scan = $row['A_Status'];
	}
	if($Scan == '1'){
		$ScanStat = 0;
	}else{
		$ScanStat = '1';
	}
	$sql = "UPDATE LOC_Config SET A_Status = '$ScanStat' WHERE C_Name='DR'";
	mysqli_query($cnx, $sql);
	mysqli_close($cnx);
}
if (isset($_POST['MR_ScanID'])) {
	$cnx = mysqli_connect("localhost", "root", "CoupE05041966","ACT"); #Cloud testing address: 138.68.149.142
	if(!$cnx){
		die("Connection failed: " . mysqli_connect_error());
	}
	$sql = "SELECT * FROM LOC_Config WHERE C_Name='MR'";
	$result = mysqli_query($cnx, $sql);
	while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
		$Scan = $row['A_Status'];
	}
	if($Scan == '1'){
		$ScanStat = 0;
	}else{
		$ScanStat = '1';
	}
	$sql = "UPDATE LOC_Config SET A_Status = '$ScanStat' WHERE C_Name='MR'";
	mysqli_query($cnx, $sql);
	mysqli_close($cnx);
}
if (isset($_POST['BR_ScanID'])) {
	$cnx = mysqli_connect("localhost", "root", "CoupE05041966","ACT"); #Cloud testing address: 138.68.149.142
	if(!$cnx){
		die("Connection failed: " . mysqli_connect_error());
	}
	$sql = "SELECT * FROM LOC_Config WHERE C_Name='BR'";
	$result = mysqli_query($cnx, $sql);
	while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
		$Scan = $row['A_Status'];
	}
	if($Scan == '1'){
		$ScanStat = 0;
	}else{
		$ScanStat = '1';
	}
	$sql = "UPDATE LOC_Config SET A_Status = '$ScanStat' WHERE C_Name='BR'";
	mysqli_query($cnx, $sql);
	mysqli_close($cnx);
}
//Iterations Update
if (isset($_POST['DR_updIterApp'])) {
	$NewIter=$_POST['DR_updIter'];
	$cnx = mysqli_connect("localhost", "root", "CoupE05041966","ACT"); #Cloud testing address: 138.68.149.142
	if(!$cnx){
		die("Connection failed: " . mysqli_connect_error());
	}
	$sql = "SELECT * FROM LOC_Config WHERE C_Name='DR'";
	$result = mysqli_query($cnx, $sql);
	while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
		$Iter = $row['K_Iter'];
	}
	$sql = "UPDATE LOC_Config SET K_Iter = '$NewIter' WHERE C_Name='DR'";
	mysqli_query($cnx, $sql);
	mysqli_close($cnx);
}
if (isset($_POST['MR_updIterApp'])) {
	$NewIter=$_POST['MR_updIter'];
	$cnx = mysqli_connect("localhost", "root", "CoupE05041966","ACT"); #Cloud testing address: 138.68.149.142
	if(!$cnx){
		die("Connection failed: " . mysqli_connect_error());
	}
	$sql = "SELECT * FROM LOC_Config WHERE C_Name='MR'";
	$result = mysqli_query($cnx, $sql);
	while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
		$Iter = $row['K_Iter'];
	}
	$sql = "UPDATE LOC_Config SET K_Iter = '$NewIter' WHERE C_Name='MR'";
	mysqli_query($cnx, $sql);
	mysqli_close($cnx);
}
if (isset($_POST['BR_updIterApp'])) {
	$NewIter=$_POST['BR_updIter'];
	$cnx = mysqli_connect("localhost", "root", "CoupE05041966","ACT"); #Cloud testing address: 138.68.149.142
	if(!$cnx){
		die("Connection failed: " . mysqli_connect_error());
	}
	$sql = "SELECT * FROM LOC_Config WHERE C_Name='BR'";
	$result = mysqli_query($cnx, $sql);
	while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
		$Iter = $row['K_Iter'];
	}
	$sql = "UPDATE LOC_Config SET K_Iter = '$NewIter' WHERE C_Name='BR'";
	mysqli_query($cnx, $sql);
	mysqli_close($cnx);
}
//Devices Update
if (isset($_POST['DR_updNumbApply'])) {
	$NewNumb = $_POST['DR_updNumb'];
	$cnx = mysqli_connect("localhost", "root", "CoupE05041966","ACT"); #Cloud testing address: 138.68.149.142
	if(!$cnx){
		die("Connection failed: " . mysqli_connect_error());
	}
	$sql = "SELECT * FROM LOC_Config";
	$result = mysqli_query($cnx, $sql);
	while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
		$Numb = $row['D_Numb'];
	}
	$sql = "UPDATE LOC_Config SET D_Numb = '$NewNumb' WHERE C_Name='DR'";
	mysqli_query($cnx, $sql);
	mysqli_close($cnx);
}
if (isset($_POST['MR_updNumbApply'])) {
	$NewNumb = $_POST['MR_updNumb'];
	$cnx = mysqli_connect("localhost", "root", "CoupE05041966","ACT"); #Cloud testing address: 138.68.149.142
	if(!$cnx){
		die("Connection failed: " . mysqli_connect_error());
	}
	$sql = "SELECT * FROM LOC_Config";
	$result = mysqli_query($cnx, $sql);
	while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
		$Numb = $row['D_Numb'];
	}
	$sql = "UPDATE LOC_Config SET D_Numb = '$NewNumb' WHERE C_Name='MR'";
	mysqli_query($cnx, $sql);
	mysqli_close($cnx);
}
if (isset($_POST['BR_updNumbApply'])) {
	$NewNumb = $_POST['BR_updNumb'];
	$cnx = mysqli_connect("localhost", "root", "CoupE05041966","ACT"); #Cloud testing address: 138.68.149.142
	if(!$cnx){
		die("Connection failed: " . mysqli_connect_error());
	}
	$sql = "SELECT * FROM LOC_Config";
	$result = mysqli_query($cnx, $sql);
	while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
		$Numb = $row['D_Numb'];
	}
	$sql = "UPDATE LOC_Config SET D_Numb = '$NewNumb' WHERE C_Name='BR'";
	mysqli_query($cnx, $sql);
	mysqli_close($cnx);
}