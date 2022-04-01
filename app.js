// Express Dependencies
const express = require("express")
const session = require('express-session')

// MongoDB Dependencies
const MongoStore = require('connect-mongo')
const MongoClient = require("./dbcontroller")

// Webapp Dependencies
const flash = require('connect-flash')
const csrf = require('csurf')

require("dotenv").config()

const app = express()

async function main() {
    MongoClient.connect((err, mongoClient) => {
        app.use(express.urlencoded({ extended: false }))
        app.use(express.json())
        
        let sessionOptions = session({
            secret: process.env.SESSIONSECRET,
            store: MongoStore.create({ client: mongoClient }),
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }
        })
    
        app.use(sessionOptions)
        app.use(flash())
    
        app.use(function(req, res, next) {
            res.locals.errors = req.flash("errors")
            res.locals.success = req.flash("success")

            res.locals.selected = -1
    
            next()
        })
    
        const router = require("./router")
        
        app.use(express.static('static'))
        app.set('views', 'templates')
        app.set('view engine', 'ejs')
        
        app.use(csrf())
    
        app.use(function(req, res, next) {
            res.locals.csrfToken = req.csrfToken()
            
            next()
        })
    
        app.use("/", router)
    
        app.use(function(err, req, res, next) {
            if (err) {
                if (err.code = "EBADCSRFTOKEN") {
                    req.flash("errors", "Cross-site forgery detected.")
                    req.session.save(() => res.redirect("/"))
                } else {
                    res.render("404")
                }
            }
    
            next()
        })
    })

    MongoClient.close()
}

main().catch(console.error)
module.exports = app;