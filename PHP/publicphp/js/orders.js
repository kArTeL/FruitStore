var jsFunction = function()
{
  console.log("getting alle");
  alert('yep');
}

var logout = function(userId, token)
{
	var redirectParams = "userId="+ userId+"&token="+token;
  
	window.location = "http://localhost:8888/PHP/logout.php?"+redirectParams;
	// console.log("calling logout");
	// console.log(userId);
	// console.log(token);
 // 	$.ajax({
 //  		type: "POST",
 //  		url: "./logout.php",
 //  		data: { userId: userId, token:token }
	// }).done(function( ) {
 //  		//alert( "Data Saved: " + msg );
	// });
}


// $('.button').click(function() {

 // 	$.ajax({
 //  		type: "POST",
 //  		url: "../logout.php",
 //  		data: { name: "John" }
	// }).done(function( msg ) {
 //  		alert( "Data Saved: " + msg );
	// });

//  });
