<?php
//welcome.php

require_once 'includes/global.inc.php';
require_once 'classes/OrderTool.class.php';
//check to see if they're logged in
// if(!isset($_SESSION['logged_in'])) {
// 	header("Location: http://localhost:9000/login.html");
// }

//get the user object from the session
//$user = unserialize($_SESSION['user']);

//Get userID and token to know if have valid session
//
//token=f766a167-9f28-4088-94c4-886fc98b2758
$userTools = new UserTools();
$userId = $_GET['userId'];
$token = $_GET['token'];
$username =  $_GET['username'];
$orders = array();

if ($token!= '' && $userId != '')
{
	if($userTools->checkSession($userId, $token)){
		//get the orders/ all orders
		$orderTool = new OrderTool();
		$orders = $orderTool->getOrders();
		// <script type="text/javascript">
  	// 	jsFunction();
		// </script>
	}else{
		//header("Location: login.php");
		header("Location: 404.php");
	}

}
else {
	header("Location: 404.php");
}

?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
    <link rel=stylesheet type="text/css" href="./publicphp/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="./publicphp/css/sweetalert.css">
    <script src = "./publicphp/js/jquery-1.11.3.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <link rel=stylesheet type="text/css" href="./publicphp/css/style.css">

  <title>Fruities</title>

</head>

<body>

  <div class="preload">
    <img src="http://i.imgur.com/KUJoe.gif">
  </div>

  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
				<form action="/logout">
					<input class = "navbar-text navbar-right btn btn-default closeButton" type="submit" value="Cerrar sesion">
				</form>
        <!-- <button class="navbar-text navbar-right btn btn-default closeButton" id = "closeSessionLabel" onClick="closeSession()">Cerrar sesión </button> -->
          <p class="navbar-text navbar-right signed-in-as-paragraph" id = "usernameLabel" >Bienvenido <? echo $username ?></p>

      </div> <!-- navbar-header-->
    </div> <!-- container-fluid-->
  </nav>

	<div class="container">
	<div class="row">
		<div class="table-responsive flat-container">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha de pedido</th>
            <th>Costo total</th>
            <th>Tarjeta de credito</th>
            <th>Email</th>
            <th>Dirección de entrega</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>

			  <? foreach ($orders as $order) : ?>
     			<tr>
       			<td><? echo $order->id ?></td>
						<td><? echo $order->saleDate ?></td>
						<td><? echo '$'.$order->totalCost ?></td>
							<td><? echo $order->creditCardNumber ?></td>
						<td><? echo $order->email ?></td>
						<td><? echo $order->address ?></td>
						<?php if($order->state == 0) : ?>
						  <td><span class="label label-info">Procesando</span></td>
							<?php else : ?>
								<td><span class="label label-success">Entregado</span></td>
						<?php endif; ?>

     			</tr>
     		<? endforeach; ?>

          <!-- <tr>
            <td>1</td>
            <td><a href="http://www.mirchu.net/mobiles/apple-iphone-6/" target="_blank">Apple iphone 6</a></td>
            <td>Waqas Hussain</td>
            <td>example@mirchu.net</td>
            <td>11/6/2014</td>
            <td>$899.00</td>
            <td><span class="label label-info">Processing</span></td>
          </tr>
          <tr>
            <td>2</td>
            <td><a href="http://www.mirchu.net/mobiles/lg-g3/" target="_blank">LG G3</a></td>
            <td>Basit Raza</td>
            <td>example@bugpluss.com</td>
            <td>10/6/2014</td>
            <td>$621.00</td>
            <td><span class="label label-success">Shipped</span></td>
          </tr>
          <tr>
            <td>3</td>
            <td><a href="http://www.mirchu.net/mobiles/samsung-galaxy-s5/" target="_blank">Samsung Galaxy S5</a></td>
            <td>Raza Ahmed</td>
            <td>example@therazz.net</td>
            <td>11/9/2013</td>
            <td>$640.00</td>
            <td><span class="label label-info">Processing</span></td>
          </tr>
          <tr>
            <td>4</td>
            <td><a href="http://www.mirchu.net/rook-bootstrap-app-landing-page/" target="_blank">Rook Landing Page</a></td>
            <td>Mirchu net</td>
            <td>example@mirchu.net</td>
            <td>11/6/2014</td>
            <td>$12.00</td>
            <td><span class="label label-primary">Completed</span></td>
          </tr> -->
        </tbody>
      </table>
    </div>
	</div>
</div>

</body>

<script src= "./publicphp/js/progress.js"></script>
<script src="./publicphp/js/sweetalert.min.js"></script>
<script src="./publicphp/js/CookieManager.js"></script>
<script src="./publicphp/js/orders.js"></script>

</html>
