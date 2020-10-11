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
$sql = "SELECT * FROM LOC_Dev_Room";
$result = mysqli_query($cnx, $sql);

while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
	$ID[] = $row['ID'];
	$OA5[] = $row['OA5'];
	$OA6[] = $row['OA6'];
	$OA7[] = $row['OA7'];
	$OA8[] = $row['OA8'];
	$ADDR[] = $row['ADDR'];
	$NAME[] = $row['NAME'];
}

mysqli_close($cnx);
$length = count($NAME);
for ($i = 0; $i < $length; $i++) {
	echo $ID[$i]." - ".$NAME[$i]." / ".$ADDR[$i]." // ".$OA5[$i].",".$OA6[$i].",".$OA7[$i].",".$OA8[$i].";<br>";
}
?>