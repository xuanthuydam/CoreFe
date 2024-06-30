Viewport: không gian hiển thị được thấy của trang web trên màn hình của người dùng

- Chiều rộng và chiều cao: Đây là kích thước của khu vực mà nội dung trang web được hiển thị
- initial-scale: Đây là mức độ zoom mặc định của trang web khi được tải lần đầu trên thiết bị. Giá trị mặc định là 1.0.
- Viewport minimum-scale và maximum-scale: Đây là các giá trị để giới hạn mức độ thu phóng của trang web trên thiết bị
  => Responsive Design: Viewport là yếu tố quan trọng trong việc tạo ra các trang web responsive, tức là có thể thích ứng và hiển thị đúng trên các thiết bị và kích thước màn hình khác nhau.
  => Optimization: Điều chỉnh các thuộc tính của viewport giúp tối ưu hóa trải nghiệm người dùng trên các thiết bị di động và desktop.
  => Accessibility: Đảm bảo rằng nội dung của trang web có thể hiển thị đầy đủ và dễ đọc trên mọi loại thiết bị.

Cấu trúc source

my-react-app/
├── node_modules/
├── public/
│ ├── favicon.ico
│ └── index.html
├── src/
│ ├── assets/
│ │ └── logo.svg
│ ├── components/
│ │ ├── Header.jsx
│ │ ├── Footer.jsx
│ │ └── ExampleComponent.jsx
│ ├── hooks/
│ │ └── useCustomHook.js
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── About.jsx
│ │ └── Contact.jsx
│ ├── services/
│ │ └── api.js
│ ├── styles/
│ │ ├── variables.css
│ │ └── global.css
│ ├── utils/
│ │ └── helpers.js
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── .gitignore
├── package.json
├── vite.config.js
└── README.md

Mô tả chi tiết từng thư mục và tệp
public/: Chứa các tệp tĩnh không qua xử lý bởi Vite.

favicon.ico: Biểu tượng của trang web.
index.html: Tệp HTML gốc của ứng dụng, nơi React sẽ được đính vào.
src/: Chứa mã nguồn của ứng dụng.

assets/: Chứa các tài nguyên như hình ảnh, biểu tượng.
logo.svg: Một hình ảnh SVG ví dụ.
components/: Chứa các thành phần React có thể tái sử dụng.
Header.jsx: Thành phần Header.
Footer.jsx: Thành phần Footer.
ExampleComponent.jsx: Thành phần ví dụ.
hooks/: Chứa các hook tùy chỉnh.
useCustomHook.js: Một hook tùy chỉnh ví dụ.
pages/: Chứa các thành phần trang chính.
Home.jsx: Thành phần trang chủ.
About.jsx: Thành phần trang giới thiệu.
Contact.jsx: Thành phần trang liên hệ.
services/: Chứa các dịch vụ như gọi API.
api.js: Tệp chứa các hàm gọi API.
styles/: Chứa các tệp CSS.
variables.css: Chứa các biến CSS.
global.css: CSS toàn cục của ứng dụng.
utils/: Chứa các hàm tiện ích.
helpers.js: Các hàm tiện ích.
App.jsx: Thành phần gốc của ứng dụng.
main.jsx: Điểm nhập chính để khởi tạo React và render ứng dụng.
index.css: Tệp CSS chung cho toàn bộ ứng dụng.
.gitignore: Danh sách các tệp và thư mục bị Git bỏ qua.

package.json: Thông tin dự án và danh sách các phụ thuộc.

vite.config.js: Cấu hình của Vite.

README.md: Tệp hướng dẫn và thông tin về dự án.
