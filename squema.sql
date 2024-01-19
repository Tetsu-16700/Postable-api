-- Crear la tabla Users
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    role VARCHAR(5) NOT NULL DEFAULT 'user',
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL
);

-- Crear la tabla Posts
CREATE TABLE Posts (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES Users(id) NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL
);

-- Crear la tabla Likes
CREATE TABLE Likes (
    id SERIAL PRIMARY KEY,
    postId INTEGER REFERENCES Posts(id) NOT NULL,
    userId INTEGER REFERENCES Users(id) NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    UNIQUE(postId, userId)
);

-- Restricciones adicionales en la tabla Users
ALTER TABLE Users
ADD CONSTRAINT chk_role CHECK (role IN ('user', 'admin'));

-- Aplicar restricciones adecuadas según tu criterio
-- Por ejemplo, establecer longitud máxima para username y email
ALTER TABLE Users
ALTER COLUMN username SET DATA TYPE VARCHAR(50);

ALTER TABLE Users
ALTER COLUMN email SET DATA TYPE VARCHAR(100);