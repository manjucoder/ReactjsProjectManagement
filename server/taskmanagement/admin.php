<?php
include "db.php";
$json=file_get_contents('php://input');
$data=json_decode($json,true);


$type=$data['type'];

if($type == 'fetch_project'){
$prj = array();
$result = mysqli_query($con,"select * from project");
while($row=$result->fetch_assoc()){
    $prj[] = $row;
}
echo json_encode($prj);
}

else if($type == 'create_project'){
    $prjname = $data['prjname'];
    $prj_id = 0;
    $result = mysqli_query($con,"select * from project");
    while($row=$result->fetch_assoc()){
         $prj_id = $row['prj_id'];
    }
    $prj_id++;

    mysqli_query($con,"insert into project values('$prj_id','$prjname')");

    echo json_encode(1);
}

?>