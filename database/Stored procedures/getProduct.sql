
CREATE OR ALTER PROCEDURE getProduct(@Id VARCHAR(255))
AS
BEGIN
   SELECT * FROM ProductTable
   WHERE Id=@Id
END;