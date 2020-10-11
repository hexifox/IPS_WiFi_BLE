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
$sql = "SELECT * FROM LOC";
$result = mysqli_query($cnx, $sql);

while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
	$ID[] = $row['ID'];
	$OA0[] = $row['OA0'];
	$OA1[] = $row['OA1'];
	$OA2[] = $row['OA2'];
	$OA3[] = $row['OA3'];
	$OA4[] = $row['OA4'];
	$ADDR[] = $row['ADDR'];
	$NAME[] = $row['NAME'];
}

mysqli_close($cnx);
$length = count($NAME);
for ($i = 0; $i < $length; $i++) {
	echo $ID[$i]." - ".$NAME[$i]." / ".$ADDR[$i]." // ".$OA0[$i].",".$OA1[$i].",".$OA2[$i].",".$OA3[$i].",".$OA4[$i].";<br>";
}
?>