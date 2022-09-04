const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const Staff = require('./models/staff')
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const staffRoutes = require('./routes/staff');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Luu staff vao req
app.use((req, res, next) => {
    Staff.findById("63121f26fccfb53d499124d7")
        .then(staff => {
            req.staff = staff
            next();
        })
        .catch(err => console.log(err));
});

app.use(staffRoutes);

app.use(errorController.get404);


mongoose
    .connect('mongodb+srv://tunglt:dvalvuumm1ty1@cluster0.5hjpvkp.mongodb.net/staff?retryWrites=true&w=majority')
    .then(result => {
        Staff.findOne().then(staff => {
            if (!staff) {
                //Neu chua co staff thi khoi tao 1 staff moi
                const staff = new Staff({
                    name: 'Nguyễn Văn A',
                    doB: '1/1/2000',
                    salaryScale: 1.1,
                    startDate: '12/2/2019',
                    department: 'IT',
                    annualLeave: 4,
                    imageUrl: 'https://www.seekpng.com/png/full/356-3562377_personal-user.png',
                    sessionWork: [
                        []
                    ],
                    isWork: false,
                    totalHourWork: 0,
                    onLeave: {},
                    endDayWork: false
                })
                staff.save()
            }
        })
        app.listen(3000)
    })
    .catch(err => console.log(err))