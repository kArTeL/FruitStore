--TRIGGER WHEN INSERTS IN session

DELIMITER $$

DROP TRIGGER IF EXISTS expirationDate_on_session_trigger $$

CREATE TRIGGER expirationDate_on_session_trigger BEFORE INSERT ON session FOR EACH ROW BEGIN
  SET NEW.expirationDate = NOW() + INTERVAL 2 HOUR;
END $$

DELIMITER ;

DELIMITER $$

DROP TRIGGER IF EXISTS update_total_price_trigger $$

CREATE TRIGGER update_total_price_trigger BEFORE INSERT ON sale FOR EACH ROW BEGIN
  UPDATE transaction t1
  SET t1.total_cost = t1.total_cost + (SELECT cost FROM fruit f WHERE f.id = NEW.fruit) * NEW.quantity
  WHERE t1.id = NEW.transaction;
END $$

DELIMITER ;


--
--
-- UPDATE customers
-- SET state = 'California',
--     customer_rep = 32
-- WHERE customer_id > 100;




SELECT s1.id
FROM session s1
WHERE s1.uuid = "6479fcd8-f995-43a0-96bc-0fe6e6dc0ab2" and
s1.user = (SELECT u1.id FROM user u1 WHERE u1.username = "user"  and u1.password = "29102910" limit 1) and s1.expirationDate > NOW()
