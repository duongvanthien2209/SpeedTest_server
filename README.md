# SpeedTest_server
## Demo Live
* Live App tại [Surge](http://typing-speed.surge.sh)
* Live API tại [Heroku](https://typing-speed-3324.herokuapp.com)
## Link Client
[SpeedTest_client](https://github.com/duongvanthien2209/SpeedTest_client)
## Chức năng chính
### Auth
***
* Lưu lại thông tin người dùng
* Kiểm tra người dùng có tồn tại thông qua tên
### Profile
***
* Cập nhật ảnh đại diện
### Post
***
* Thêm người dùng
* Thay đổi ảnh đại diện
* Thêm thành tích của người dùng
* Lấy đoạn văn bản mẫu
* Lấy danh sách 10 người có thành tích cao nhất
* Xem lịch sử của người dùng
### Thông báo
***
* Thông báo khi thêm thông tin thành công
* Thông báo khi có lỗi hệ thống
## Cài đặt
### Install server dependencies
***
`npm install`
### Thêm file .env
***
```.env
PORT=5000
MONGO_URL= <your_mongoDB_URI>
CLOUD_NAME= <your_cloud_name>
API_KEY= <your_cloud_api_key>
API_SECRET= <your_cloud_api_secret>
```
### Install client dependencies
***
`npm install`
### Run Express in server
***
`npm run dev`
### Run React in client
***
`npm start`
### Build for production
*** 
`npm run build`
## Thông tin
### Author
***
Van Thien
