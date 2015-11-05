<?php
require_once 'User.class.php';
require_once 'DB.class.php';
//require_once('FirePHPCore/fb.php');
class UserTools {

	//Log the user in. First checks to see if the
	//username and password match a row in the database.
	//If it is successful, set the session variables
	//and store the user object within.
	public function login($username, $password)
	{

		$hashedPassword = md5($password);
		$result = mysql_query("SELECT * FROM user WHERE username = '$username' AND password = '$hashedPassword'");

		if(mysql_num_rows($result) == 1)
		{
			$_SESSION["user"] = serialize(new User(mysql_fetch_assoc($result)));
			$_SESSION["login_time"] = time();
			$_SESSION["logged_in"] = 1;
			return true;
		}else{
			return false;
		}
	}

	//Log the user out. Destroy the session variables.
	public function logout() {
		unset($_SESSION["user"]);
		unset($_SESSION["login_time"]);
		unset($_SESSION["logged_in"]);
		session_destroy();
	}

	//Check to see if a username exists.
	//This is called during registration to make sure all user names are unique.
	public function checkUsernameExists($username) {
		//ob_start();
		$result = mysql_query("select id from user where username='$username'");
		//fb($result);
    	if(mysql_num_rows($result) == 0)
    	{
			return false;
	   	}else{
	   		return true;
		}
	}

	public function checkSession($userId, $token) {
		$db = new DB();
		$result =  mysql_query("select uuid from session s1, user where s1.uuid='$token' and s1.user = '$userId' and user.id = s1.user and user.role = 1 and s1.expirationDate > NOW() and s1.enabled = 1");
		if (mysql_num_rows($result) == 0)
		{
			return false;
		}
		else {
			$_SESSION["logged_in"] = 1;
			return true;
		}
	}

	public function closeSession($userId, $token)
	{
		// UPDATE session SET enabled = 0 where uuid="+ mysql.escape(json["token"]) + "|| user =" + json["userId"]
		 $result = mysql_query("update session set enabled = 0 where uuid= '$token' || user = '$userId'");
		 $this->logout();
		 return true;
	}


	//get a user
	//returns a User object. Takes the users id as an input
	public function get($id)
	{
		$db = new DB();
		$result = $db->select('user', "id = $id");

		return new User($result);
	}

}

?>
