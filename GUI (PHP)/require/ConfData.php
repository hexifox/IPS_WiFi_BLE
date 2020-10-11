<?php
/*
Omega Analytics Systems Ltd.
Copyright © 2017 Omega Analytics Systems Ltd.
All rights reserved.
*/

#Cloud testing address: 138.68.149.142 (DEAD)
#Local testing address: 192.168.9.67 (LIVE - OA-SRV-I.local)
$cnx = mysqli_connect("localhost", "root", "CoupE05041966","ACT"); 
if(!$cnx){
	die("Connection failed: " . mysqli_connect_errno());
}
$sql = "SELECT * FROM LOC_Config";
$result = mysqli_query($cnx, $sql);

while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
	$ID[] = $row['ID'];
	$C_Name[] = $row['C_Name'];
	$K_Iter[] = $row['K_Iter'];
	$D_Numb[] = $row['D_Numb'];
	$A_Status[] = $row['A_Status'];
}

mysqli_close($cnx);
$length = count($C_Name);
for ($i = 0; $i < $length; $i++) {
	echo $ID[$i]." - ".$C_Name[$i]." / ".$K_Iter[$i]." / ".$D_Numb[$i]." / ".$A_Status[$i].";<br>";
}
?>