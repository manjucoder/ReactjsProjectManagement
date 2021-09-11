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

else if($type == 'create_task'){
   
    $prj_id=$data['prjId'];
    $prj_name=$data['prjName'];
    $task_name=$data['taskName'];
    $assign=$data['assignedto'];

    $task_id = 0;
    $result = mysqli_query($con,"select * from task");
    while($row=$result->fetch_assoc()){
        $task_id= $row['task_id'];
    }
    $task_id++;
    
    mysqli_query($con,"insert into task values('$task_id','$task_name','$prj_id','$prj_name','$assign','New')");

    echo json_encode(1);
}

else if($type == 'completed_task'){
    $task = array();
    $result = mysqli_query($con,"select * from task where status='complete'");
    while($row=$result->fetch_assoc()){
        $task[]= $row;
    }
    echo json_encode($task);
}
?>