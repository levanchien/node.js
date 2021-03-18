#### SQL Server: Mức cô lập

1. ***Lost Updates***: hai giao dịch cùng cập nhật trên cùng một hàng, và cả hai không biết lẫn nhau

![](https://s3-us-west-1.amazonaws.com/morpheus-staging/system/spud_media/466/original/lostupdate001.png?1424555949)

2. ***Dirty Read*** (đọc rác): khi giao dịch này chọn những row mà đang được giao dịch khác giữ nhưng chưa commit (nếu việc commit thất bại or rollback => dữ liệu đọc có thể bị sai)

+ Giao dịch A:
    ```sql
    BEGIN TRAN
    UPDATE dbo.Item SET name = 'x'WHERE id > 2
    WAITFOR DELAY '00:00:10' --wait for 10 seconds
    ROLLBACK
    ```
+ Giao dịch B:
    ```sql
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
    -- same as NO LOCK
    SELECT * FROM dbo.Item
    ```
    Kết quả là giao dịch B in ra các rows với **```name = x```**. Mặc dù đã *rollback*.

+ Solution:
    + Sử dụng mức cô lập (isolation) **```READ COMMITTED```** (mặc định của sql server).
    + Giao dịch B sẽ chờ cho đến khi giao dịch A hoàn tất (commited)
    ```sql
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
    -- same as NO LOCK
    SELECT * FROM dbo.Item
    ```

3. ***Nonrepeatable Read*** (đọc dữ liệu không đồng nhất):
Là việc một giao dịch chọn cùng một tập kết quả nhưng lại trả về giá trị khác nhau.
Giao dịch A chọn một hàng, sau đó giao dịch B cập nhật lại hàng đó và commit, và giao dịch A lại select hàng đó một lần nữa thì kết quả của hai lần không giống nhau

+ Giao Dịch A:
    ```sql
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED
    BEGIN TRAN
    SELECT * FROM dbo.Item where id > 1
    -- Giả sử B xảy ra trong đoạn này
    WAITFOR DELAY '00:00:10' --wait for 10 seconds
    SELECT * FROM dbo.Item where id > 1
    COMMIT
    ```
+ Giao Dịch B:
    ```sql
    UPDATE dbo.Item SET `NAME` = "XXX" WHERE id > 2
    ```
    *Kết quả là giao dịch A cho ra hai kết quả khác nhau với cùng câu select*
+ Solution
    + Sử dụng mức cô lập (isolation) **```REPEATABLE READ```** 
    + Sửa giao dịch A thành:
    ```sql
        SET TRANSACTION ISOLATION LEVEL REPEATABLE READ
        ...
    ```
    + Chú ý: nếu giao dịch B chèn hoặc xóa các bản ghi liên quan thì **```REPEATABLE READ```** vô dụng, tức là giao dịch B không bị lock. Điều này dẫn đến **``Phantom Read``**.
4. ***Phantom Read*** (Đọc bản ghi ảo)
Đọc ảo xảy ra khi, trong quá trình của một giao dịch, các hàng mới được thêm (```insert```) vào hoặc bị xóa (```delete```) bởi một giao dịch khác đối với các bản ghi đang được đọc hoặc có liên quan đến bản ghi này.

+ Giao dịch A:
    ```sql
    SET TRANSACTION ISOLATION LEVEL REPEATABLE READ
    SELECT * FROM users WHERE age BETWEEN 10 AND 30;
    -- Giả sử B xảy ra trong đoạn này
    WAITFOR DELAY '00:00:10' --wait for 10 seconds
    SELECT * FROM users WHERE age BETWEEN 10 AND 30;
    ```
+ Giao dịch B:
    ```sql
    INSERT INTO users(id, name, age) VALUES (3, 'Bob', 27);
    COMMIT;
    ```
+ Kết quả là giao dịch A sẽ cho ra 2 kết quả khác nhau. Câu lệnh select thứ hai sẽ cho nhiều hơn câu lện thứ nhất một bản ghi
+ Solution:
    + Sử dụng mức cô lập (isolation) **```SERIALIZABLE```** 
    + Sửa giao dịch A thành:
    ```sql
        SET TRANSACTION ISOLATION LEVEL SERIALIZABLE
        ...
    ``` 
    + khi chạy A -> B, ta sẽ thấy được B bị lock cho đến khi A hoàn tất
    
### LOCK

1. ***Dead Lock***
+ Dead Lock: xảy ra khi không giao dịch nào trong hai giao dịch được commit vì chúng đang có khóa trên tài nguyên mà giao dịch kia cần.

+ Giao dịch A
    ```sql
    SET TRANSACTION ISOLATION LEVEL REPEATABLE READ
    BEGIN TRAN
    DECLARE @_num int;
    Select @_num = num  from product where id = 5;
    WAITFOR DELAY '00:00:04' --wait for 10 seconds
    UPDATE product SET num = @_num + 2 WHERE id = 5;
    COMMIT
    Select * from product where id = 5
    ```
+ Giao dịch B
    ```sql
    SET TRANSACTION ISOLATION LEVEL REPEATABLE READ
    BEGIN TRAN
    DECLARE @_num int;
    Select @_num = num  from product where id = 5;
    UPDATE product SET num = @_num + 2 WHERE id = 5;
    COMMIT
    Select * from product where id = 5
    ```
+ Nguyên nhân dẫn đến dead lock:
  + Giao dịch A yêu cầu khóa **```S```** trên bảng **```Product```** (câu lệnh select)
  + Giao dịch B yêu cầu khóa **```S```** trên bảng **```Product```** (câu lệnh select)
  + Giao dịch B yêu cầu khóa **```X```** để thực hiện lệnh Update nhưng không được vì A đang giữ khóa **```S```** và chưa commit
  + Sau 5s giao dịch A yêu cầu khóa **```X```** trên bảng **```Product```** để thực hiện lệnh **```Update```** nhưng không được vì B đang giữ khóa **```S```** và chưa được commit
  + Kết quả là cả A và B đều không được commit, Sql server tự động chọn một trong hai giao dịch làm nạn nhân của khóa chết và rollback trả lại mã lỗi **```1205```**, giao dịch còn lại sẽ được commit.
+ Giải pháp:
  + Sử dụng mức isolation càng thấp càng tốt
  + Giao dịch càng ngắn càng tốt
  + Viết mã theo cùng thứ tự đễ tránh đợi khóa của nhau

#### LOCK MODE

```sql
BEGIN TRAN
--SELECT * FROM product with(READUNCOMMITTED) where id = 3
--SELECT * FROM product with(nolock) where id = 3
--SELECT * FROM product with(xlock) where id = 3
--SELECT * FROM product with(xlock) where id = 3
--SELECT * FROM product with(updlock) where id = 3
--SELECT * FROM product with(READCOMMITTED) where id = 3
--SELECT * FROM product with(REPEATABLEREAD) where id = 3
--SELECT * FROM product with(ROWLOCK) where id = 3
WAITFOR DELAY '00:00:10' --wait for 10 seconds
COMMIT    
```

```sql
BEGIN TRAN
SELECT * FROM product where id = 3
UPDATE product set num = num + 10 where id = 3
--WAITFOR DELAY '00:00:10' --wait for 10 seconds
COMMIT
```

```sql
BEGIN TRAN
SELECT * FROM product with(xlock) where id = 3
COMMIT
```