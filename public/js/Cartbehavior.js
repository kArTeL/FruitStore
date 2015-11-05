var cart;
$(document).ready(function(){

  cart = JSON.parse(getCookie("cart"));
  console.log(cart);
  var currentUsername =  getCookie("username");
  var signedinasText = "Bienvenido "+ currentUsername;
  $("#usernameLabel").text(signedinasText);

  updateUI();
  //getFruits();
});

//Update the UI with cart information

var updateUI = function()
{
  //get the body of the table
  var tableBody = $('#cart > tbody');
  //remove all the childs
  tableBody.empty();
  var total = 0;
  for (var i = 0; i< cart.products.length; i++)
  {
    var fruit = cart.products[i].fruit;
    var fruitQuantity = cart.products[i].quantity;
    total = total + (fruit.cost * fruitQuantity);
    addProductToTable(fruitQuantity, fruit, tableBody);

  }
  updateTotals(total);

}

var addProductToTable = function (quantity, fruit, tableBody)
{
  tableBody.append(
    '<tr><td data-th="Product">'
      + '<div class="row">'
        + '<div class="col-sm-2 hidden-xs"><img src="'+fruit.imageURL + '"  class="img-responsive"/></div>'
      + '<div class="col-sm-10">'
        + '<h4 class="nomargin">' + fruit.name + '</h4>'
        + '<p>' + fruit.description + '</p>'
      + '</div>'
    + '</div> </td>'
    + '<td data-th="Price">$' + fruit.cost +'</td>'
    + '<td data-th="Quantity"> <p class="form-control">' + quantity + '</p></td>'
    + '<td data-th="Subtotal" class="text-center">$' + (fruit.cost * quantity) + '</td>'
   + '</tr>'
  );

}
//call ws post and delete cookie and all about the order
var placeOrderEvent = function()
{
  if (validateCreditCard())
  {
    //send to server the cart
    var creditcardNumber = $("#card-number").val();
    cart.creditcard = creditcardNumber;
    cart.token = getCookie("sessionId");

    var params = createCart();

    params = JSON.stringify(params);
    //call post to make the order
    $.ajax({
       type: "POST",
       url: "./api/fruits/buyFruits",
       data: JSON.parse(params),
       beforeSend: function(){
       },

       //success case
       success: function (data) {

         hideProgress();

         deleteCookie("cart");

         console.log( getCookie("cart"));

         swal({   title: "Orden realizada",
         text: "La orden fué realizada con exito, le llegara a la dirección fijada cuando se le creo la cuenta.",
         type: "success",
         showCancelButton: false,
         confirmButtonColor: "#DD6B55",
         confirmButtonText: "Listo",
         closeOnConfirm: false
       }, function(){
         window.location = "/fruits.html";
         //swal("Deleted!", "Your imaginary file has been deleted.", "success");
       });
        //  deleteCookie("fruits");

       },
       //Error case
       error: function (jqXHR, textStatus, errorThrown) {
         hideProgress();
         //pass to JSON
        var error = JSON.stringify(eval('('+jqXHR.responseText+')'));
        error = JSON.parse(error);
        //console.log(jqXHR);
        sweetAlert("No autorizado", error.message, "error");
        //alert(error.message);
       }
    });



  }
}

var removeSession = function ()
{
  var userId = getCookie("userId");
  var token = getCookie("sessionId");
  if (userId !=undefined || token != undefined)
  {
    var credentials = {userId:userId, token:token};
    $.ajax({
       type: "POST",
       url: "./api/login/logout",
       data: credentials,
       beforeSend: function(){
       },
         //success case
       success: function (data) {

         hideProgress();
        deleteCookie("userId");
        deleteCookie("sessionId");
        deleteCookie("cart");
        deleteCookie("username");
         window.location = "/login.html";

        },
         //Error case
        error: function (jqXHR, textStatus, errorThrown) {
         hideProgress();
           //pass to JSON
         var error = JSON.stringify(eval('('+jqXHR.responseText+')'));
         error = JSON.parse(error);
         sweetAlert("Oops", error.message, "error");

          //alert(error.message);
       }
    });
  }
  else
  {
    swal({   title: "Error interno",
    text: "Ha ocurrido un error en la aplicación",
    type: "success",
    showCancelButton: false,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Aceptar",
    closeOnConfirm: false
  }, function(){
    window.location = "/login.html";
    //swal("Deleted!", "Your imaginary file has been deleted.", "success");
  });
  }

}
var closeSession = function()
{
  swal({
    title: "¿Cerrar sesión?",
    text: "¿Realmente deseas salir de la sesión? Tu carro se borrará",
    type: "warning",
    showCancelButton: true,
    confirmButtonClass: "btn-danger",
    cancelButtonText:"Cancelar",
    confirmButtonText: "Cerrar sesión",
    closeOnConfirm: false
  },
  function(){
    removeSession();
  //swal("Deleted!", "Your imaginary file has been deleted.", "success");
  });
}

var createCart = function()
{
  var productsArray = [];
  for (var i = 0; i < cart.products.length; i++)
  {
    var product = {fruitId:cart.products[i].id, quantity:cart.products[i].quantity};
    productsArray[i] = product;
  }
  var postCart = {userId:cart.userId, token:getCookie("sessionId"),creditcard:$("#card-number").val(), products:JSON.stringify(productsArray)};

  return postCart;
}

var validateCreditCard = function()
{
  var cardNumberLabel = $("#card-number");
  var cardNumber = cardNumberLabel.val();
  var returnValue = true;
  if (!cardNumber)
  {
     returnValue= false;
      sweetAlert("Oops...", "Ingresa la tarjeta de crédito", "error");
  }else
  //check if is number
  if (!(/^\d+$/.test(cardNumber)))
  {
    returnValue = false;
      sweetAlert("Oops...", "No es una tarjeta válida", "error");
  }
  return returnValue;
}

var updateTotals = function(total)
{
  //total td for mobile
  var totalMobile = $('#total-mobile');

  //total td for wide-screen
  var totalWidescreeen = $('#total-wide');

  var totalString = "<strong>Total: $" + total + '</strong>';
  totalMobile.html(totalString);
  totalWidescreeen.html(totalString);
}
