const express = require('express')
const signup = express.Router()
const path = require('path')
const { nanoid } = require('nanoid')

const db = require('../db/index.js')
const mail = require('../email/index.js')
const auth = require('./auth.js')
const { User } = require('../db/models.js')
const { genHash } = require('../util/index.js')
const { validatePassword } = require('../auth/validator.js')
const errorControl = require('../errorControl.js')

signup.get('/signup', auth.redirectDashboard, (req, res) => {
    res.render('signup', { error: null })
})

signup.get('/confirmaccount/:randomToken', errorControl(async (req, res) => {
    const { rows } = await db.query('UPDATE users SET confirmed = TRUE ' +
        'WHERE confirmation_code = $1 RETURNING email', [req.params.randomToken])
    if (rows.length > 0) {
        res.render('confirmed', { message: 'Email confirmed, you may sign in now' })
    } else {
        return res.send('invalid confirmation code')
    }
}))

signup.post('/usersignup', errorControl(async (req, res) => {
    const { email, password } = req.body

    if (await checkDuplicateUser(email)) { 
        return res.render('signup', { error: { message: 'User already exists' }})
    } else if (!validatePassword(password)) {
        return res.render('signup', { error: { message: `Password can only contain
            letters and numbers`
        }})
    }
    const hash = await genHash(password)
    const randomToken = nanoid()
    const user = new User(email, hash, randomToken)
    await insertUser(user)
    await mail.sendConfirmation(user)
    res.sendFile(path.join(__dirname + '/../views/emailSent.html'))
}))

signup.get('/usersignout', async (req, res, next) => {
    req.session.destroy(function (err) {
        res.redirect('/login')
    })
})

async function checkDuplicateUser(email) {
    const { rows } = await db.query('SELECT email FROM users WHERE email = $1', [email])
    return rows.length > 0
}

async function insertUser({ email, hash, code }) {
    await db.query('INSERT INTO users(email, password, confirmation_code) VALUES($1, $2, $3)', [email, hash, code])
}

module.exports = signup
