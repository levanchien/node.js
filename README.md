# Nodejs

### Kiến trúc node.js
![Minion](https://i.imgur.com/gLYA30E.png)

- V8: Bao gồm Memory Heap, Call Stack, Garbage Collector và chuyển đổi mã Javscript thành mã máy của hệ điều hành.
- Libuv: Bao gồm Thread Pool và Event Loop, Event Queue. Nó là thư viện C đa nền tảng tập trung vào các tác vụ I/O không đồng bộ.
- Node.js Standard Library: Bao gồm các thư viện, các chức năng liên quan đến hệ điều hành cho Timers như setTimeout , File system như fs, Network Calls như http.
- llhttp: Phân tích request/response HTTP (trước đây là http-parse).
- c-ares: Thư viện C cho DNS không đồng bộ được sử dụng trong dns module
- open-ssl: Các chức năng mã hóa được sử dụng trong tls (ssl), crypto module.
- zlib: Nén và giải nén bằng cách chạy đồng bộ, không đồng bộ và streaming.
- Node.js API: Cung cấp JavaScript API được sử dụng bởi các ứng dụng.

### Envent Loop
![Minion](https://i.imgur.com/kF77pbd.png)
- Call Stack sẽ thực thi như đã giải thích ở trên, nhưng khi gặp các hàm có độ trễ cao thì nó sẽ không bị chặn. Thay vào đó, nó sẽ đánh dấu sự kiện đó với chức năng gọi lại và sẽ tiếp tục thực hiện tiếp.
- Node.js Standard Library được thực thi sẽ chạy ở background (không phải trong Call Stack) bằng cách sử dụng nhóm luồng (Thread Pool) trong thư viện libuv. Ví dụ: fs là một hàm sẽ được thực thi ở background và khi hoàn thành, nó sẽ thêm hàm callback vào Event Queue.
- Event Queue chứa các hàm callback đang được chờ đợi cho đến khi Event Loop đưa chúng trở lại Call Stack và thực thi.
- Event Loop sẽ di chuyển các hàm gọi lại từ Event Queue sang Call Stack để được thực thi bởi luồng chính. Khi Call Stack trống và Event Queue đang có các hàm chờ xử lý, Event Loop sẽ di chuyển chúng sang Call Stack và chúng sẽ được thực thi bởi luồng chính.