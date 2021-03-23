1. Kỹ thuật (short) ***polling***
 + Tạo các request tới server theo chu kỳ
 + Example
    ```js
    function poll() {
        
    }
    setInterval(poll, 1000);
    ```
2. Kỹ thuật ***long polling***
 + Gửi yêu cầu GET ```dài hạn``` để nhận dữ liệu từ máy chủ
 + Gửi yêu cầu POST ```ngắn hạn``` để gửi dữ liệu từ máy chủ
 + Example
    ```js
    function poll() {
        //
        poll();
    }
    poll();
    ```
3. ***WebSocket***
 + Là công nghệ cho phép giao tiếp tương tác hai chiều giữa client và server. Nó giúp gửi và nhận dữ liệu theo hướng sự kiện mà ko cần phải sử dụng các kỹ thuật polling.
 + Khi kết nối được thiết lập, client và server giao tiếp mà ko cần các header -> tăng hiệu suất.


#### Socket IO
1. Socket IO là thư viện chó phép giao tiếp giữa client và server dựa trên kết nối Websocket. Và sẽ chuyển sang sử dụng các công nghệ khác như HTTP long polling nếu kết nối websocket thất bại