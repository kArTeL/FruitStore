<?php

require_once 'includes/global.inc.php';

$userId = $_GET['userId'];
$token = $_GET['token'];
// echo 'entre like a boss' ;
// echo $userId;
// echo $token;

$userTools = new UserTools();
$userTools->closeSession($userId,$token);

header("Location: http://127.0.0.1:6080/login.html");





?>
