CREATE TABLE IF NOT EXISTS role (
  id SERIAL,
  name VARCHAR(18) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS "user"  (
  id SERIAL,
  username  VARCHAR(18) NOT NULL,
  password  VARCHAR(18) NOT NULL,
  email     VARCHAR(50) NOT NULL,
  delivery_address TEXT NOT NULL,
  role INTEGER NOT NULL REFERENCES role(id),
  -- Same data types as the parent tables
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS fruit (
  id SERIAL,
  name  VARCHAR(22) NOT NULL,
  description TEXT NOT NULL,
  imageURL TEXT NOT NULL,
  cost FLOAT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS transaction (
  id SERIAL,
  sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "user" INT NOT NULL REFERENCES "user"(id),
  total_cost FLOAT DEFAULT 0.0,
  creditCardNumber VARCHAR(20),
  state INT DEFAULT 0,
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS sale (
  id       SERIAL,
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


CREATE TABLE IF NOT EXISTS session (
  id SERIAL,
  uuid VARCHAR(40) NOT NULL,
  creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expirationDate TIMESTAMP,
  enabled INTEGER DEFAULT 1,
  "user"  INTEGER  NOT NULL REFERENCES "user"(id),
  PRIMARY KEY(id)
);

DO
$body$
BEGIN
IF NOT EXISTS (
   SELECT * FROM pg_catalog.pg_user WHERE  usename = 'frutoso') THEN
      CREATE USER frutoso WITH PASSWORD 'frutoso';
      GRANT INSERT,SELECT, UPDATE  ON session TO frutoso;
      GRANT INSERT,SELECT, UPDATE  ON sale TO frutoso;
      GRANT INSERT,SELECT, UPDATE  ON transaction TO frutoso;
      GRANT INSERT,SELECT, UPDATE  ON fruit TO frutoso;
      GRANT INSERT,SELECT, UPDATE  ON "user" TO frutoso;
   END IF;
END
$body$;


