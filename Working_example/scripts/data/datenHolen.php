<?php 

require 'connect.php' ;
$sql="SELECT A_00,A_01,A_02,B_01,B_02,B_03,B_04,C_01,C_02,C_03,C_04,C_05,C_06,D3_11,D3_13,D3_14,D5_01,D5_02,D5_06,D7_01,D7_02,D7_03,E_01 FROM holsea_dataworkbook";
$d=mysqli_query($con,$sql)
    or die("Error: ".mysqli_error($con));

$ProbenKurz=[];
while ($row = $d->fetch_assoc()) {
    $ProbenKurz[] = $row;
}

print json_encode($ProbenKurz);

// Free result set
$d -> free_result();

$con -> close();
 ?>