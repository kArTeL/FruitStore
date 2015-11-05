//Fruits structure
//{id, name, cost}

var fruits;

//Method need a post like this {creditcard: "" , userId: "",  products: [{fruitId:"", quantity: 2}]}
//we can use this variable to save the user cart
var cart = {userId:"", token:"",products:[],creditcard:""};

$(document).ready(function(){
//swal({   title: "Error!",   text: "Here's my error message!",   type: "error",   confirmButtonText: "Cool" });
  var currentUsername = getCookie("username");
  var signedinasText = "Bienvenido "+ currentUsername;
  var userId = getCookie("userId");
  cart.userId = userId;
  $("#usernameLabel").text(signedinasText);
  getFruits();
});

var getFruits = function (){
  showProgress();
  var cUserId = getCookie("userId");
  var cToken = getCookie("sessionId");
    //get the credentials
  var jsonCredentials = {userId:cUserId, token:cToken};

  $.ajax({
     type: "POST",
     url: "./api/fruits",
     data: jsonCredentials,
     beforeSend: function(){
     },

       //success case
     success: function (data) {

       hideProgress();
         //pass data to JSON
       //data = JSON.parse(data);

       reloadTable(data);
       var cartCookie = getCookie("cart");
       if ( cartCookie != undefined && cartCookie != "" && cartCookie != "empty")
       {
         console.log("cartcookiestringify: " + cartCookie);
         cartCookie = JSON.parse(cartCookie);
         console.log("jsonfy : " + cartCookie);
         if (cartCookie.products != undefined)
         {
           cart = cartCookie;
           console.log(cartCookie.products);

           updateUIWithCookie();
         }
       }


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
};

var reloadTable = function(json)
{
  var fruitContainer =  $('#fruit-container');
  var fruitsJSON = JSON.parse(json);
  fruits = [];
  for (var i = 0; i < fruitsJSON.length ; i++)
  {
    var fruit = fruitsJSON[i];
    fruits.push(fruit);

    fruitContainer.append(
      '<div class="col-sm-6 col-md-3">'
       + '<div class="thumbnail"> <img src='  +  fruit.imageURL +'>'
        + '<div class="caption"><h3>' + fruit.name + ' $' + fruit.cost +'</h3>'
          + '<p>' + fruit.description + '</p>'
          + '<p class= "paragraph-center">'
            + '<button class="btn btn-danger btn-lg" onClick="decreaseItemToCardClicked(' + fruit.id + ')">' + '-</button>'
            + '<label class="lead price-label" id="fruit' +fruit.id + '">' + 0 + '</label>'
            + '<button class="btn btn-success btn-lg" onClick="addItemToCartClicked(' + fruit.id + ')">'+ '+</button>'
          + '</p>'
        + '</div>'
      +'</div>'
      +'</div>'
    );
  }
  console.log(fruits);
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

var updateUIWithCookie = function()
{
  for (var i = 0; i < cart.products.length ; i++)
  {
    var quantityId = "#fruit" +cart.products[i].id;
    var quantityLabel = $(quantityId);
    var fruitQuantity = cart.products[i].quantity;
    quantityLabel.text(fruitQuantity);
  }
}
//Decrease event from the UI
var decreaseItemToCardClicked = function (fruitId)
{
  //get index of the fruit in the car order
  var fruitIndexInCart =  getIndexForFruitInCart(fruitId);

  //if fruit exist in cart
  if (fruitIndexInCart != -1)
  {
    //get the product
    var product = cart.products[fruitIndexInCart];

    //if we have a product with quantity 1 or lower, then we need remove this fruit of the cart
    if (product.quantity <= 1)
    {
      //remove the fruit from the cart
      cart.products.splice(fruitIndexInCart, 1);
      changeFruitQuantityInUI(fruitId, 0);
    }
    else
    {
      //decrease the number of products in my car
      product.quantity = product.quantity-1;

      //update Ui
      changeFruitQuantityInUI(fruitId, product.quantity);

    }

  }
  //save cookies in order
  saveOrderInCoockie();
}

//Increment event from the UI
var addItemToCartClicked = function (fruitId)
{
  //get index of the fruit in the car order
  var fruitIndexInCart =  getIndexForFruitInCart(fruitId);

  //if fruit not exist into the cart order
  if (fruitIndexInCart == -1)
  {
    //create a product
    var fruitIndex = getFruitIndexWithId(fruitId);
    //console.log(fruitIndex);
    var product = {id:fruitId, quantity:1, fruit:fruits[fruitIndex]};

    //insert into the cart
    cart.products.push(product);

    //updateUI for the fruit
    changeFruitQuantityInUI(fruitId,1);

  }
  else
  {
    //get the product
    var product = cart.products[fruitIndexInCart];

    //get the maximun that user can buy
    var maxQuantityForProduct = getMaxQuantityForFruit(fruitId);

    //if is the maximum or equal quantity of fruit
    if (maxQuantityForProduct >= product.quantity+1)
    {
      //increment
      product.quantity = product.quantity + 1;

      //update the UI
      changeFruitQuantityInUI(fruitId, product.quantity);
    }


  }
  //save in cookiess the order
  saveOrderInCoockie();
}
//Return the index  of the fruit in the order, if is not in the order the fruitId then return -1
var getIndexForFruitInCart = function(fruitId)
{
  for (var i = 0; i < cart.products.length; i++)
  {
    var fruit = cart.products[i];
    if (fruit.id == fruitId)
    {
      return i;
    }
  }
  return -1;
}

//Get the maximum quantity for the fruit :fruitId
var getMaxQuantityForFruit = function(fruitId)
{
  for (var i = 0; i < fruits.length; i++)
  {
    var fruit = fruits[i];
    if (fruit.id == fruitId)
    {
      return fruit.quantity;
    }
  }
  return -1;
}

var getFruitIndexWithId = function(fruitId)
{
  for (var i = 0; i < fruits.length; i++)
  {
    var fruit = fruits[i];
    if (fruit.id == fruitId)
    {
      return i;
    }
  }
  return 0;
}

//UPdate the UI to show the quantity of fruits in cart
var changeFruitQuantityInUI = function(fruitId, quantity)
{
  var fruitQuantityLabelId = "#fruit"+fruitId;
  var quantityLabel = $(fruitQuantityLabelId).text(quantity);
}

var saveOrderInCoockie = function()
{
  createCookie("cart","",2)
  var stringifycart = JSON.stringify(cart);
  createCookie("cart",stringifycart,2);
}
