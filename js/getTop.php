
<!DOCTYPE html>
<html>
<body>

<?php
$q = intval($_GET['q']);

$con = mysqli_connect('localhost','LISA','passw0rd','my_db');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"LISA");
$sql="SELECT * FROM TopHits WHERE id = '".$q."'";
$result = mysqli_query($con,$sql);

//add the results we get

mysqli_close($con);
?>
</body>
</html> 