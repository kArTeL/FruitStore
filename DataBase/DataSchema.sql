

CREATE TABLE role (
  id  INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(18) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE user  (
  id        INT   NOT NULL AUTO_INCREMENT,
  username  VARCHAR(18) NOT NULL,
  password  VARCHAR(18) NOT NULL,
  email     VARCHAR(50) NOT NULL,
  delivery_address TEXT NOT NULL,
  role INT  NOT NULL REFERENCES role(id),
  -- Same data types as the parent tables
  PRIMARY KEY (id)
);

CREATE TABLE fruit (
  id INT NOT NULL AUTO_INCREMENT,
  name  VARCHAR(22) NOT NULL,
  description TEXT NOT NULL,
  imageURL TEXT NOT NULL,
  cost FLOAT NOT NULL,
  quantity INT NOT NULL,


  PRIMARY KEY(id)

);

CREATE TABLE transaction (
  id INT NOT NULL AUTO_INCREMENT,
  sale_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  user   INT NOT NULL REFERENCES user(id),
  total_cost FLOAT DEFAULT 0.0,
  creditCardNumber VARCHAR(20),
  state INT DEFAULT 0,
  PRIMARY KEY(id)
);

CREATE TABLE sale (
  id       INT NOT NULL AUTO_INCREMENT,
  fruit    INT  NOT NULL REFERENCES fruit(id),
  quantity INT NOT NULL,
  transaction    INT  NOT NULL REFERENCES transaction(id),
  PRIMARY KEY(id)
);

-- CREATE TABLE orderPurshase (
--   id INT NOT NULL AUTO_INCREMENT,
--   purchase_date DATE NOT NULL,
--   user   INT NOT NULL REFERENCES user(id),
--   PRIMARY KEY(id)
-- );
-- CREATE TABLE purchase (
--   id INT NOT NULL AUTO_INCREMENT,
--   quantity INT NOT NULL,
--   fruit  INT  NOT NULL REFERENCES fruit(id),
--   orderPurshase INT  NOT NULL REFERENCES orderPurshase(id),
--   PRIMARY KEY(id)
-- );


CREATE TABLE session (
  id INT NOT NULL AUTO_INCREMENT,
  uuid VARCHAR(40) NOT NULL,
  creationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  expirationDate DATETIME,
  enabled INT DEFAULT 1,
  user  INT  NOT NULL REFERENCES user(id),
  PRIMARY KEY(id)
);

CREATE USER 'frutoso'@'localhost' IDENTIFIED BY 'frutoso';
 GRANT INSERT,SELECT, UPDATE  ON fruits.session TO 'frutoso' @'localhost';
 GRANT INSERT,SELECT, UPDATE  ON fruits.sale TO 'frutoso' @'localhost';
 GRANT INSERT,SELECT, UPDATE  ON fruits.transaction TO 'frutoso' @'localhost';
 GRANT INSERT,SELECT, UPDATE  ON fruits.fruit TO 'frutoso' @'localhost';
GRANT INSERT,SELECT, UPDATE  ON fruits.user TO 'frutoso' @'localhost';
