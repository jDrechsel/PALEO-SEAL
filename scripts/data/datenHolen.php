<?php 

require 'connect.php' ;
// require 'connect_LOCAL.php' ;
// phpinfo();
//$sql2="SELECT A_01,A_02,B_01,B_02,B_03,B_04,C0_01,C0_02,D3_11,D5_01,D5_06,D7_01 FROM data_entries";
//old query
//$sql="SELECT A_01,A_02,B_01,B_02,B_03,B_04,C_01,C_02,C_04,D3_11,D5_01,D5_06,D7_01 FROM data_entries_oldhead";
//new query with uncertainties
$sql="SELECT A_00,A_01,A_02,B_01,B_02,B_03,B_04,C_01,C_02,C_03,C_04,C_05,C_06,D3_11,D3_13,D3_14,D5_01,D5_02,D5_06,D7_01,D7_02,D7_03,E_01 FROM data_entries_newdata";
// // $ProbenKurz = new stdClass();
//$sql=options(MYSQLI_OPT_INT_AND_FLOAT_NATIVE, 1);
$d=mysqli_query($con,$sql)
    or die("Error: ".mysqli_error($con));

// if (!function_exists('mysqli_fetch_all')) {
//     function mysqli_fetch_all(mysqli_result $result) {
//         $data = [];
//         while ($data[] = $result->fetch_assoc()) {}
//         return $data;
//     }
// }

$ProbenKurz=[];
while ($row = $d->fetch_assoc()) {
    $ProbenKurz[] = $row;
}


// $ProbenKurz=mysqli_fetch_all($d,MYSQLI_BOTH);

print json_encode($ProbenKurz);

// Free result set
$d -> free_result();

$con -> close();
 ?>