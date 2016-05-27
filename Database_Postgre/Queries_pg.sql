--TRIGGER WHEN INSERTS IN session

CREATE OR REPLACE FUNCTION expirationDate_on_session() RETURNS TRIGGER AS $expirationDate_on_session$
  DECLARE
  BEGIN
   NEW.expirationDate := CURRENT_TIMESTAMP + interval '2 hour';
   RETURN NEW;
  END;
$expirationDate_on_session$ LANGUAGE plpgsql;

CREATE TRIGGER expirationDate_on_session_trigger BEFORE INSERT ON session FOR EACH ROW
    EXECUTE PROCEDURE expirationDate_on_session();

 CREATE OR REPLACE FUNCTION update_total_price() RETURNS TRIGGER AS $update_total_price$
  DECLARE
  BEGIN
   UPDATE transaction t1
   SET total_cost = total_cost + (SELECT cost FROM fruit f WHERE f.id = NEW.fruit) * NEW.quantity
   WHERE t1.id = NEW.transaction;
   RETURN NEW;
  END;
$update_total_price$ LANGUAGE plpgsql;

CREATE TRIGGER update_total_price_trigger BEFORE INSERT ON sale FOR EACH ROW
    EXECUTE PROCEDURE update_total_price();   

--
--
-- UPDATE customers
-- SET state = 'California',
--     customer_rep = 32
-- WHERE customer_id > 100;

SELECT s1.id
FROM "session" s1
WHERE s1.uuid = '6479fcd8-f995-43a0-96bc-0fe6e6dc0ab2' and
s1.user = (SELECT u1.id FROM "user" u1 WHERE u1.username = 'user'  and u1.password = '29102910' limit 1) and s1.expirationDate > NOW()
