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
$sql="SELECT * FROM holsea_dataworkbook WHERE A_00 IN $exportString";
$headersSQL="SHOW COLUMNS FROM holsea_dataworkbook";
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
    return "$stringA$stringB";
    // echo $stringA.$stringB.',';
};
$retreivedStrings=array_map('getHeaderStrings', $headerArray);

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

$filename = "exportfilePHP.csv";

$handle = fopen($filename, 'w+');

fputcsv($handle, $retreivedStrings);

foreach ($ProbenKurz as $line){
    fputcsv($handle, $line);
}

fclose($handle);

readfile($filename);
unlink($filename)
 ?>