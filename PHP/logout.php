<?php

require_once 'includes/global.inc.php';

$userId = $_GET['userId'];
$token = $_GET['token'];
// echo 'entre like a boss' ;
// echo $userId;
// echo $token;

$userTools = new UserTools();
$userTools->closeSession($userId,$token);

header("Location: https://192.168.122.2:6081/~usuario10/login.html");





?>
