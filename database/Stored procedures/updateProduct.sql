
CREATE OR ALTER PROCEDURE updateProduct(@Id VARCHAR(255),
   @Names VARCHAR(255),
   @CategoryID VARCHAR(255),
   @Price INT
   )
AS
BEGIN
   UPDATE ProductTable SET Names = @Names, CategoryID =@CategoryID, Price = @Price
   WHERE Id=@Id
END