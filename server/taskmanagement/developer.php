<?php
include "db.php";
$json=file_get_contents('php://input');
$data=json_decode($json,true);

$type=$data['type'];

if($type == 'fetch_task'){
$devid = $data['devId'];
$task = array();
$result = mysqli_query($con,"select * from task where assigned_to = '$devid'");
while($row=$result->fetch_assoc()){
    $task[] = $row;
}
echo json_encode($task);
}

else if($type == 'update_task'){
    $PrjStatus = $data['PrjStatus'];
    // $DevId = $data['DevId'];
    $TaskId = $data['TaskId'];

    mysqli_query($con,"update task set status='$PrjStatus' where task_id='$TaskId'");

    echo json_encode(1);
}

?>