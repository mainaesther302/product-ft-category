
CREATE OR ALTER PROCEDURE addProduct(@Id VARCHAR(255), @Names VARCHAR(255), @CategoryID VARCHAR(255), @Price INT)
AS
BEGIN
    INSERT INTO ProductTable (Id, Names, CategoryID, Price) 
    VALUES (@Id, @Names, @CategoryID, @Price)
END;