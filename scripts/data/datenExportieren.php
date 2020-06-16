<?php 
require 'connect.php' ; // load $con

$exportList=json_decode($_POST['data']);

function createInString($listEntry){
    $tmp=array();

    return '(\'' .implode('\',\'', $listEntry ) . '\')';
};
$exportString=createInString($exportList);

// retreive column headers from db
$sql="SELECT * FROM holsea_dataworkbook_40 WHERE A_00 IN $exportString";
$headersSQL="SHOW COLUMNS FROM data_entries_newdata";
$headersQuery=mysqli_query($con, $headersSQL);
$headersResults = array();
while ($row = $headersQuery->fetch_assoc()){
    $headersResults[] = $row["Field"];
};



$d=mysqli_query($con,$sql)
    or die("Error: ".mysqli_error($con));


    $ProbenKurz=[];
    while ($row = $d->fetch_assoc()) {
        $ProbenKurz[] = $row;
    }



$retreived= json_encode($ProbenKurz);

$first=true;

if (empty($retreived)) { 
    die("The JSON string is empty!");
  }

$filename = "exportfile" .date("Y-m-d_H_i_s") . ".csv";

$handle = fopen($filename, 'w+');

fputcsv($handle, $headersResults);

foreach ($ProbenKurz as $line){
    fputcsv($handle, $line);
}

fclose($handle);

header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="$filename"');
header('Content-Transfer-Encoding: binary');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . filesize($filename));
readfile($filename);

 ?>