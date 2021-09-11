<?php
include "db.php";
$json=file_get_contents('php://input');
$data=json_decode($json,true);


$username=$data['username'];
$pwd=$data['pwd'];
$usertype=$data['usertype'];

$temp=0;
$result=mysqli_query($con,"select * from login where usertype='$usertype'");
while($row=$result->fetch_assoc()){
    if($row['username']==$username && $row['pwd']==$pwd)
    {
        $temp=$row['id'];
    }
}

echo json_encode($temp);
?>