const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById("62fcb4b968eacff4ab40627b")
        .then(user => {
            req.user = user
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose
    .connect('mongodb+srv://tunglt:dvalvuumm1ty1@cluster0.5hjpvkp.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Tunglt',
                    email: 'tunglt@gmail.com',
                    cart: {
                        items: []
                    }
                })
                user.save()
            }
        })
        app.listen(3000)
    })
    .catch(err => console.log(err))