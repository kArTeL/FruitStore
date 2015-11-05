$(document).ready(function(){
//swal({   title: "Error!",   text: "Here's my error message!",   type: "error",   confirmButtonText: "Cool" });

});

$('#btnLogin').click(function(event){
  //fnOpenSidebar();
    event.preventDefault();
    //console.log("login");
    login();
});
   var login = function (){
     //if all fields are filled
     if (validateFields())
     {
       showProgress();
       //get the credentials
       var jsonCredentials = {username:$('#username').val(), password: $('#password').val()};
// ~usuario10/api/login
       $.ajax({
          type: "POST",
          url: "/api/login",
          data: jsonCredentials,
          beforeSend: function(){
          },

          //success case
          success: function (data) {

            hideProgress();
            //pass data to JSON
            //data = JSON.parse(data);

            console.log(data);


             //check the role and redirect depending on it
             if (data.role == 2)
             {
               createCookie("username", $('#username').val());
               createCookie("userId",data.userId,2);
               createCookie("sessionId", data.token,2);
               window.location = "./fruits.html";
             }
             else if (data.role == 1){
               var redirectParams = "username=" + $('#username').val() + "&userId="+data.userId+ "&token="+data.token;
               window.location = "http://127.0.0.1:7080/~usuario10/PHP/orders.php?"+redirectParams;
             }
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

   };

  //Validation methods
   function validateFields()
   {
     var returnValue = true;
     if (!$('#username').val())
     {
       returnValue = false;
       sweetAlert("Oops...", "El username es requerido", "error");
       //alert("Username is required");
     }
     else
     if (!$('#password').val())
     {
       returnValue = false;
       sweetAlert("Oops...", "Contraseña requerida", "error");
      // alert("Password is required");
     }
     return returnValue;
   }
