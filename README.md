This is our project and will be updated soon.
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  password VARCHAR(20),
  home_airport VARCHAR(50)
);

INSERT INTO users (name, password, home_airport)
VALUES ('Charlie', 'hotdogs', 'JFK');