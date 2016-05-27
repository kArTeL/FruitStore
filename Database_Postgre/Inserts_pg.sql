-- INSERTS  ROLES, USERS, ETC, ETC ----
INSERT INTO role (name) VALUES('Administrator');
INSERT INTO role (name) VALUES('user');

-- INSERTS INITIAL USERS
INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('administrator','asp128','neilliga@gmail.com', 'Carmiol 2 casa #25', 1);

INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('admin','admin','usuario10b@orificio.ecci.ucr.ac.cr', 'Casa del admin :D', 1);

INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('user','29102910','usuario10a@orificio.ecci.ucr.ac.cr', 'Carmiol 2 casa #25', 2);


-- INSERT INTO user (username,password,email,delivery_address,role) VALUES('usuario10a','usuario10a','usuario10a@orificio.ecci.ucr.ac.cr', 'Carmiol 2 casa #25', 2);
INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario22a','usuario22a','usuario22a@orificio.ecci.ucr.ac.cr', 'Residencia de usuario22a', 1);
INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario22b','usuario22b','usuario22b@orificio.ecci.ucr.ac.cr', 'Residencia de usuario22b', 1);

INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario14a','usuario14a','usuario14a@orificio.ecci.ucr.ac.cr', 'Residencia de usuario14a', 1);
INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario14b','usuario14b','usuario14b@orificio.ecci.ucr.ac.cr', 'Residencia de usuario14b', 1);

INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario18a','usuario18a','usuario18a@orificio.ecci.ucr.ac.cr', 'Residencia de usuario18a', 1);
INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario18b','usuario18b','usuario18b@orificio.ecci.ucr.ac.cr', 'Residencia de usuario18b', 1);	

INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario21a','usuario21a','usuario21a@orificio.ecci.ucr.ac.cr', 'Residencia de usuario21a', 1);
INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario21b','usuario21b','usuario21b@orificio.ecci.ucr.ac.cr', 'Residencia de usuario21b', 1);	

INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario25a','usuario25a','usuario18a@orificio.ecci.ucr.ac.cr', 'Residencia de usuario25a', 1);
INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario25b','usuario25b','usuario25b@orificio.ecci.ucr.ac.cr', 'Residencia de usuario25b', 1);	

INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario16a','usuario16a','usuario16a@orificio.ecci.ucr.ac.cr', 'Residencia de usuario16a', 1);
INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario16b','usuario16b','usuario16b@orificio.ecci.ucr.ac.cr', 'Residencia de usuario16b', 1);	

INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario20a','usuario20a','usuario20a@orificio.ecci.ucr.ac.cr', 'Residencia de usuario20a', 1);
INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario20b','usuario20b','usuario20b@orificio.ecci.ucr.ac.cr', 'Residencia de usuario20b', 1);	


INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario11a','usuario11a','usuario11a@orificio.ecci.ucr.ac.cr', 'Residencia de usuario11a', 1);
INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario11b','usuario11b','usuario11b@orificio.ecci.ucr.ac.cr', 'Residencia de usuario11b', 1);	

INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario28a','usuario28a','usuario28a@orificio.ecci.ucr.ac.cr', 'Residencia de usuario28a', 1);
INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario28b','usuario28b','usuario28b@orificio.ecci.ucr.ac.cr', 'Residencia de usuario28b', 1);	

INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario24a','usuario24a','usuario24a@orificio.ecci.ucr.ac.cr', 'Residencia de usuario24a', 1);
INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario24b','usuario16b','usuario24b@orificio.ecci.ucr.ac.cr', 'Residencia de usuario24b', 1);


INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario13a','usuario13a','usuario13a@orificio.ecci.ucr.ac.cr', 'Residencia de usuario13a', 1);
INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario13b','usuario13b','usuario13b@orificio.ecci.ucr.ac.cr', 'Residencia de usuario13b', 1);	


INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario15a','usuario15a','usuario15a@orificio.ecci.ucr.ac.cr', 'Residencia de usuario15a', 1);
INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario15b','usuario15b','usuario15b@orificio.ecci.ucr.ac.cr', 'Residencia de usuario15b', 1);	


INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario17a','usuario17a','usuario17a@orificio.ecci.ucr.ac.cr', 'Residencia de usuario17a', 1);
INSERT INTO "user" (username,password,email,delivery_address,role) VALUES('usuario17b','usuario17b','usuario17b@orificio.ecci.ucr.ac.cr', 'Residencia de usuario17b', 1);	

-- Create a valid session
INSERT INTO session(uuid,"user")
SELECT '23140328424' AS uuid, id FROM "user" WHERE username = 'administrator';


-- INSERT Fruits
INSERT INTO fruit(name,description, imageURL, cost, quantity) VALUES('Manzana','Deliciosa manzana que ayuda para tu salud, cosechada por agricultores costarricenses.','http://i.imgur.com/Mljgbms.png?1',  5,10);

INSERT INTO fruit(name,description, imageURL, cost, quantity) VALUES('Banano','Las bananas, sin dudas, que están entre las frutas más ricas, sino es la más rica. No sólo es rica sino que es súper sana, contiene azúcares naturales, ofrece fibra y energías, instantáneamente.','http://pngimg.com/upload/banana_PNG845.png',  1,20);

INSERT INTO fruit(name,description, imageURL, cost, quantity) VALUES('Pera','La pera es cosechada por los agricultores costarricenses en diversas zonas del país, es saludable comer una por lo menos una vez al día', 'http://pngimg.com/upload/pear_PNG3466.png', 3,2);

INSERT INTO fruit(name,description, imageURL, cost, quantity) VALUES('Uva', 'Delisiosas uvas para disfrutar en familiar','http://pngimg.com/upload/grape_PNG2982.png',2, 1);



INSERT INTO transaction("user",creditCardNumber)
SELECT id, '4-348293-492349' AS creditCardNumber FROM "user" WHERE username = 'admin';

INSERT INTO sale(fruit,quantity, transaction) VALUES(1,1,1);
