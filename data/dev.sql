PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE cars (
  id INTEGER PRIMARY KEY ASC,
  color varchar(25)
);
INSERT INTO "cars" VALUES(1,'red');
INSERT INTO "cars" VALUES(2,'blue');
INSERT INTO "cars" VALUES(3,'green');
COMMIT;
