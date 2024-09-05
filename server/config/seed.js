const User = require('../api/user/userModel')
const bcrypt =require ("bcrypt")
User.findOne({ email: 'admin@gmail.com' }).exec()
    .then((data) => {
        if (data == null) {
            let admin = new User()
            admin.autoId = 1
            admin.name = "admin"
            admin.email = "admin@gmail.com"
            admin.password =bcrypt.hashSync("123",10) 
            admin.userType = 1
            admin.save()
                .then(() => {
                    console.log('Admin Created');
                })
                .catch((err) => {
                    console.log("Error in admin created", err);
                })
        }
        else {
            console.log("Admin Already Exist's");
        }
    })
