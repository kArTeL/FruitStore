<?php

class Order {
  public $id;
  public $saleDate;
  public $totalCost;
  public $creditCardNumber;
  public $state;
  public $user;
  public $email;
  public $address;


  function __construct($data) {
    $this->id = (isset($data['id'])) ? $data['id'] : "";
    $this->saleDate = (isset($data['sale_date'])) ? $data['sale_date'] : "";
    $this->user = (isset($data['user'])) ? $data['user'] : "";
    $this->totalCost = (isset($data['total_cost'])) ? $data['total_cost'] : "";
    $this->creditCardNumber = (isset($data['creditCardNumber'])) ? $data['creditCardNumber'] : "";
    $this->state = (isset($data['state'])) ? $data['state'] : "";
    $this->email = (isset($data['email'])) ? $data['email'] : "";
    $this->address = (isset($data['delivery_address'])) ? $data['delivery_address'] : "";
  }


}

?>
