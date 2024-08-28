CREATE TABLE category (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL 
)

ALTER TABLE category
    ADD COLUMN color varchar(16),
    ADD COLUMN icon varchar(16)


SELECT id , name FROM category;