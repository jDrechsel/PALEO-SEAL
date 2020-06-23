<?php 
require 'connect.php' ; // load $con

// convert export list to php array
$exportList=json_decode($_POST['data']);

// convert php array to string for SQL
function createInString($listEntry){

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

//get strings (Name_header, Unit_header)
$headerLookup=file_get_contents('../../data/lookups/data_headers_lookup.json');
$headerArray=json_decode($headerLookup, true);

function getHeaderStrings($n){
    $stringA = $n['Name_head'];
    if (array_key_exists('Unit_head',$n)){
        $stringB = " ".$n['Unit_head'];
    } else {
        $stringB = '';
    }
    echo $stringA.$stringB.',';
};
$retreivedStrings=array_map('getHeaderStrings', $headerArray);
echo "\n";

// Get all fields of selected entries
$d=mysqli_query($con,$sql)
    or die("Error: ".mysqli_error($con));


    $ProbenKurz=[];
    while ($row = $d->fetch_assoc()) {
        $ProbenKurz[] = $row;
    }



$retreived= json_encode($ProbenKurz);


if (empty($retreived)) { 
    die("The JSON string is empty!");
  }

$filename = "exportfile" .date("Y-m-d_H_i_s") . ".csv";

$handle = fopen($filename, 'w+');

// fputcsv($handle, $headersResults);

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