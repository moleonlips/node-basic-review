## configs
-- Noi thiet lap cau hinh he thong

## controllers
-- Xu ly logic he thong

## helpers
-- Chua nhung functions co the tai su dung

## middlewares
-- Chua nhung dich vu phai call den ben thu 3

## migration
-- Chua nhung thay doi ve database
-- Including any changes about database

## models
-- Tao entry cho cac doi tuong, tac nhan tham gia he thong
-- Including set of entry object, they will be take part in the system

## public
-- Chua nhung file tinh, co the goi tu clients
-- Including system files that's able to call from client side

## routes
-- Thiet lap dieu huong he thong
-- System navigates configuations

## seeder
-- Mock data phuc vu viec testing
-- Mock data provide for testing

## services
-- Chua nhung services, query call den DB
-- Including script that will be call to database

## views
-- Chua code UI he thong
-- HTML

# EXPORT DEFAULT:
- What you are export, default it will be used when you call.
- For example:
-- modules.export = myfunction
- So, when you require the file which including 'myfunction':
-- const myfunct = require (filename.include.module.export);
=> it will be reference that function thought you set any name for it

# SOME PROBLEMS NEED TO CARE IN DEVELOPING - KEYWORDS
- Database rate limit
- Connection never close
- Connection cost
- Performace
- Connection pooling // Connection pool pattern
-- Giam thoi gian ket noi den CSDL bang cach tai su dung (reusing) cac ket noi truoc do.
-- Han che viec ung dung bi qua tai (overload) - He thong co the cham nhung khong the bi sap.