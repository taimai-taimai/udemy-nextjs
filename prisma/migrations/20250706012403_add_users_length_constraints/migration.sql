-- This is an empty migration.
ALTER TABLE users ADD CONSTRAINT users_name_length CHECK (length(name) >= 1);
ALTER TABLE users ADD CONSTRAINT users_email_length CHECK (length(email) >= 1);
ALTER TABLE users ADD CONSTRAINT users_password_length CHECK (length(password) >= 1);
