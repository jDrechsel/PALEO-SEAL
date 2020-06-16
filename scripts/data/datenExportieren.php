<?php 


// header('Cache-Control: max-age=0');
// echo "\n PHP -> \n php: export routine started 1 \n -> POST: ";
// $entityBody = file_get_contents('php://input');
// print_r($entityBody);
// print_r($_POST);
// echo "php: export routine started 2 \n -> etwas: ";
$etwas=json_decode($_POST['data']);
// var_dump($etwas);
// $etwas2=$_POST['data'];
// echo "php: export routine started 3 \n -> REQUEST: ";
// var_dump($_REQUEST);
// echo "php: export routine started 4 \n";
require 'connect.php' ; // load $con
// require 'connect_LOCAL.php' ; // load $con
//require 'loadCustomData.php'
//loadCustomData();
// $exportUIDs=$_POST['data'];
// $exUIDs='('. implode(',',$exportUIDs) .')';
// echo $exportUIDs;
// print_r($exportUIDs);

function createInString($something){
    $tmp=array();
    // foreach($something as $item){
    //     $tmp[] = mysqli_escape_string($con, $item);
    // }
    // return '\'' .implode('\',\'', $tmp ) . '\'';
    return '(\'' .implode('\',\'', $something ) . '\')';
};
$etwas2=createInString($etwas);

// echo "php: export conversion started 5 \n -> etwas2: ";
// var_dump($etwas2);

$sql="SELECT * FROM holsea_dataworkbook_40 WHERE A_00 IN $etwas2";
$headersSQL="SHOW COLUMNS FROM data_entries_newdata";
$headersQuery=mysqli_query($con, $headersSQL);
// $headersResults = $headersQuery -> fetch_all();
$headersResults = array();
while ($row = $headersQuery->fetch_assoc()){
    // var_dump($row["Field"]);
    $headersResults[] = $row["Field"];
};

function getHeaderStrings($var){
    // var_dump($var[0]);
    return $var[0];
}
 $headers = array_map( "getHeaderStrings", $headersResults);

//new query with uncertainties
//$sql=options(MYSQLI_OPT_INT_AND_FLOAT_NATIVE, 1);
$d=mysqli_query($con,$sql)
    or die("Error: ".mysqli_error($con));


    $ProbenKurz=[];
    while ($row = $d->fetch_assoc()) {
        $ProbenKurz[] = $row;
    }

// $ProbenKurz=mysqli_fetch_all($d);

// print json_encode($ProbenKurz);
$retreived= json_encode($ProbenKurz);

$first=true;

if (empty($retreived)) { 
    die("The JSON string is empty!");
  }

$filename = "exportfile" .date("Y-m-d_H_i_s") . ".csv";
// $filename = "exportfile";
// $out = fopen('data/report.csv', 'w');
$handle = fopen($filename, 'w+');
// $handle = fopen('php://output', 'w+');
// fputcsv($handle, $headers);
// echo $headers;
fputcsv($handle, $headersResults);

foreach ($ProbenKurz as $line){
    // var_dump($line);
    fputcsv($handle, $line);
}

fclose($handle);
// rewind($handle);
// header('Content-Type: text/csv; charset=utf-8');
// header('Content-Disposition: attachment; filename=\'$filename\'');
header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="$filename"');
// header('Content-Disposition: attachment; filename='.basename($filename));
header('Content-Transfer-Encoding: binary');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . filesize($filename));
readfile($filename);
// fpassthru( $filename);
// while($row = mysqli_fetch_all($d,MYSQLI_BOTH)){
//     if($first){
//         $titles = array();
//         foreach($row as $key=>$val){
//             $titles[] = $key;
//         }
//         fputcsv($out, $titles);
//         $first = false;
//     }
//     fputcsv($out, $row);
// }

 ?>