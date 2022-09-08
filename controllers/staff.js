const Staff = require('../models/staff')
const Covid = require('../models/covid')
const mongoose = require('mongoose')

exports.getStaff = (req, res, next) => {
    res.render('viewStaff/staff-info', {
        pageTitle: 'Thông Tin Nhân Viên',
        path: '/staff',
        staff: req.staff,
        doB: `${req.staff.doB.getDate()}/${req.staff.doB.getMonth() + 1}/${req.staff.doB.getFullYear()}`,
        startDate: `${req.staff.startDate.getDate()}/${req.staff.startDate.getMonth() + 1}/${req.staff.startDate.getFullYear()}`
    });
};

exports.getIndex = (req, res, next) => {
    res.render('viewStaff/index', {
            pageTitle: 'Điểm Danh',
            path: '/',
            staff: req.staff,
            isWork: req.staff.isWork,
            totalHours: req.staff.totalHours,
            messageErr: null
        })
        // res.send('hello')
};

exports.postImage = (req, res, next) => {
    const imageUrl = req.body.imageUrl
    Staff
        .findById(req.staff._id)
        .then(staff => {
            //Capj nhat url anh
            staff.imageUrl = imageUrl
            return staff.save()
        })
        .then(result => {
            return res.redirect('/staff')
        })
        .catch(err => console.log(err))
}

exports.getWork = (req, res, next) => {

    return res.render('viewStaff/woking-hours-info', {
        pageTitle: 'Thông tin giờ làm',
        path: '/work',
        staff: req.staff,
        sessionWork: req.staff.sessionWork.items,
        salary: 0,
        errMessage: null,
        monthSalary: null,
        totalOTInMonth: 0,
        missingHours: 0
    })
}

exports.postWork = (req, res) => {
    const item = req.staff.sessionWork.length - 1
    const itemIndex = req.staff.sessionWork[item].length - 1
    const monthSalary = req.body.monthSalary
    const monthSalarySelected = req.staff.sessionWork[item][itemIndex].timeStart.getMonth() + 1
    let salary = 0
    let errMessage
        // Tinh tong so gio OT
    let totalOTInMonth = req.staff.sessionWork.reduce((acc, cur) => {
            return acc + cur[cur.length - 1].overTime
        }, 0)
        //Tinh tong so gio lam thieu
    let missingHours = req.staff.sessionWork.reduce((acc, cur) => {
            let missHour = cur[cur.length - 1].totalHourWork <= 8 ? 8 - cur[cur.length - 1].totalHourWork : 0
            return acc + missHour
        }, 0)
        //Kiem tra thang chon xem da co thong tin chua
    if (monthSalary == monthSalarySelected) {
        salary = req.staff.salaryScale * 3000000 + (totalOTInMonth - missingHours) * 200000
    } else {
        errMessage = 'Chưa có thông tin lương của tháng này.'
    }

    return res.render('viewStaff/woking-hours-info', {
        pageTitle: 'Thông tin giờ làm',
        path: '/work',
        staff: req.staff,
        sessionWork: req.staff.sessionWork.items,
        salary: salary,
        errMessage: errMessage,
        monthSalary: monthSalary,
        totalOTInMonth: totalOTInMonth,
        missingHours: missingHours
    })
}

exports.getCovid = (req, res, next) => {
    Covid.find({ 'staff.staffId': req.staff._id })
        .then(covidData => {
            if (covidData.length == 0) {
                return res.render('viewStaff/covid-info', {
                    pageTitle: 'Thông tin covid',
                    path: '/covid',
                    staff: req.staff,
                    covid: ''
                })
            }
            const covid = covidData[0]
            let dateInfection = ''
            if (covid.dateInfection == undefined) {
                dateInfection = 'Chưa cập nhật'
            } else {
                dateInfection = `${covid.dateInfection.getDate()}/${covid.dateInfection.getMonth() + 1}/${covid.dateInfection.getFullYear()}`
            }
            return res.render('viewStaff/covid-info', {
                pageTitle: 'Thông tin covid',
                path: '/covid',
                staff: req.staff,
                covid: covid,
                dateVaccine1: `${covid.dateVaccine1.getDate()}/${covid.dateVaccine1.getMonth() + 1}/${covid.dateVaccine1.getFullYear()}`,
                dateVaccine2: `${covid.dateVaccine2.getDate()}/${covid.dateVaccine2.getMonth() + 1}/${covid.dateVaccine2.getFullYear()}`,
                dateTemp: `${covid.dateTemp.getHours()}h${covid.dateTemp.getMinutes()} - ${covid.dateTemp.getDate()}/${covid.dateTemp.getMonth() + 1}/${covid.dateVaccine2.getFullYear()}`,
                dateInfection: dateInfection
            })
        })
        .catch(err => {
            const error = new Error(err)
            error.httpStatusCode = 500
            return next(error)
        })
}

exports.postCovid = (req, res, next) => {
    const temp = req.body.temp
    const dateTemp = new Date().toISOString()
    const dateVaccine1 = req.body.dateVaccine1
    const typeVaccine1 = req.body.typeVaccine1
    const dateVaccine2 = req.body.dateVaccine2
    const typeVaccine2 = req.body.typeVaccine2
    const dateInfection = req.body.dateInfection
    const place = req.body.place
    Covid.find({ 'staff.staffId': req.staff._id })
        .then(covidData => {
            //kiem tra da co du lieu covid hay chua
            if (covidData.length === 0) {
                const covid = new Covid({
                    temp: temp,
                    dateTemp: new Date(dateTemp),
                    dateVaccine1: dateVaccine1,
                    typeVaccine1: typeVaccine1,
                    dateVaccine2: dateVaccine2,
                    typeVaccine2: typeVaccine2,
                    dateInfection: dateInfection,
                    place: place,
                    staff: {
                        name: req.staff.name,
                        staffId: req.staff
                    }
                })
                return covid.save()
            } else {
                const covid = covidData[0]
                covid.temp = temp
                covid.dateTemp = new Date(dateTemp)
                covid.dateVaccine1 = dateVaccine1
                covid.typeVaccine1 = typeVaccine1
                covid.dateVaccine2 = dateVaccine2
                covid.typeVaccine2 = typeVaccine2
                covid.dateInfection = dateInfection
                covid.place = place
                covid.staff.name = req.staff.name
                covid.staff.staffId = req.staff
                return covid.save()
            }
        })
        .then(() => {
            return res.redirect('/covid')
        })
        .catch(err => console.log(err))

}

exports.postWorking = (req, res) => {
    const timeStart = new Date().toISOString()
    const name = req.staff.name
    const placeWork = req.body.placeWork
    Staff
        .findById(req.staff._id)
        .then(staff => {
            staff.endDayWork = false
            staff.isWork = true
            const item = []
            const itemSection = {
                timeStart: new Date(timeStart),
                name: name,
                placeWork: placeWork,
            }
            item.push(itemSection)
                //Neu chua co ngay lam nao thi push vao phan tu dau tien
            if (staff.sessionWork[staff.sessionWork.length - 1][0] === undefined) {
                staff.sessionWork[staff.sessionWork.length - 1].push(itemSection)
                return staff.save()
            }
            //Neu ngay thay doi thi push mang moi vao sessionWork
            if (itemSection.timeStart.getDate() != staff.sessionWork[staff.sessionWork.length - 1][0].timeStart.getDate()) {
                //Reset tong gio lam va lich off khi chuyen sang ngay moi
                staff.totalHours = 0
                staff.onLeave = {}
                staff.sessionWork.push(item)
                return staff.save()
            }
            //Neu ngay khong thay doi thi push object moi vao mang cua ngay lam do
            staff.sessionWork[staff.sessionWork.length - 1].push(itemSection)
            return staff.save()


        })
        .then(result => {
            return res.redirect('/')
        })
        .catch(err => console.log(err))
}

exports.postEndWorking = (req, res) => {
    const timeEnd = new Date().toISOString()
    Staff
        .findById(req.staff._id)
        .then(staff => {
            //Lay ra object cuoi cung cua sessionWork[item[]]
            const item = staff.sessionWork.length - 1
            const itemIndex = staff.sessionWork[item].length - 1
            let totalTimeWork = new Date((new Date(timeEnd).getTime()) - (staff.sessionWork[item][itemIndex].timeStart.getTime()))
                //Chuyen doi tu miliseconds sang hours
            totalTimeWork = (totalTimeWork / 1000) / 3600

            console.log(totalTimeWork)
            staff.isWork = false
            staff.totalHours += +totalTimeWork.toFixed(1)
            staff.sessionWork[item][itemIndex].totalHour = totalTimeWork.toFixed(1)
            staff.sessionWork[item][itemIndex].timeEnd = new Date(timeEnd)
                // staff.sessionWork = [[]]
            return staff.save()
        })
        .then(result => {
            return res.redirect('/')
        })
        .catch(err => console.log(err))

}

exports.postEndDayWork = (req, res) => {
    Staff
        .findById(req.staff._id)
        .then(staff => {
            const item = staff.sessionWork.length - 1
            const itemIndex = staff.sessionWork[item].length - 1
            staff.sessionWork[item][itemIndex].totalHourWork = staff.totalHours
            staff.sessionWork[item][itemIndex].hourAnnualLeave = staff.onLeave.hourAnnualLeave
                //Check neu tong gio lam cua ngay lon hon 8 thi tinh vao gio OT
            if (staff.totalHours > 8) {
                staff.sessionWork[item][itemIndex].overTime = staff.totalHours - 8
            } else {
                staff.sessionWork[item][itemIndex].overTime = 0
            }
            return staff.save()

        })
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
}

exports.postOffWork = (req, res) => {
    const dateStart = new Date(req.body.dateStart)
    const dateEnd = new Date(req.body.dateEnd)
    const reason = req.body.reason
    const hourAnnualLeave = req.body.hourAnnualLeave
    Staff
        .findById(req.staff._id)
        .then(staff => {
            let messageErr
                //Check truong hop so ngay dang ky lon hon so ngay nghi con lai
            if ((dateEnd.getDate() - dateStart.getDate()) > staff.annualLeave) {
                messageErr = 'Số ngày đăng ký vượt quá ngày nghỉ cho phép.'
                return res.status(422).render('viewStaff/index', {
                    pageTitle: 'Điểm Danh',
                    path: '/',
                    staff: req.staff,
                    isWork: req.staff.isWork,
                    totalHours: req.staff.totalHours,
                    messageErr: messageErr
                })
            }
            // Check truong hop nghi 1 ngay
            if (dateEnd.getDate() == dateStart.getDate()) {
                staff.annualLeave = hourAnnualLeave <= 4 ? staff.annualLeave - 0.5 : staff.annualLeave - 1
            }
            //Check truong hop nghi nhieu ngay
            if (dateEnd.getDate() > dateStart.getDate()) {
                const hourNum = hourAnnualLeave <= 4 ? 0.5 : 1
                staff.annualLeave = staff.annualLeave - ((dateEnd.getDate() - dateStart.getDate()) + hourNum)
            }
            staff.onLeave.dateStart = dateStart
            staff.onLeave.dateEnd = dateEnd
            staff.onLeave.reason = reason
            staff.onLeave.hourAnnualLeave = hourAnnualLeave
            staff.save()
                .then(() => {
                    res.redirect('/')
                })
        })
        .catch(err => console.log(err))
}