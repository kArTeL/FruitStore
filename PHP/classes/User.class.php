<?php
require_once 'UserTools.class.php';
require_once 'DB.class.php';


class User {

	public $id;
	public $username;
	public $hashedPassword;
	public $email;
	public $joinDate;

	//Constructor is called whenever a new object is created.
	//Takes an associative array with the DB row as an argument.
	function __construct($data) {
		$this->id = (isset($data['id'])) ? $data['id'] : "";
		$this->username = (isset($data['username'])) ? $data['username'] : "";
		$this->email = (isset($data['email'])) ? $data['email'] : "";
	}

	public function save($isNewUser = false) {
		//create a new database object.
		$db = new DB();

		//if the user is already registered and we're
		//just updating their info.
		if(!$isNewUser) {
			//set the data array
			$data = array(
				"username" => "'$this->username'",
				"email" => "'$this->email'"
			);

			//update the row in the database
			$db->update($data, 'user', 'id = '.$this->id);
		}else {
		//if the user is being registered for the first time.
			$data = array(
				"username" => "'$this->username'",
				"email" => "'$this->email'"
			);

			$this->id = $db->insert($data, 'user');
			$this->joinDate = time();
		}
		return true;
	}

}

?>
