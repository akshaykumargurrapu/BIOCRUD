require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user')
const ProfessionalData = require('./models/professional')
const PersonalData = require('./models/personal_model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb+srv://nodejs:nodejs@cluster0.zoxgxam.mongodb.net/test',{ignoreUndefined:true})

app.post("/api/register", async (req, res) => {
    console.log(req.body)
    try {
        const salt = await bcrypt.genSalt()
        const hashedpassword = await bcrypt.hash(req.body.password, salt)
        console.log(req.body.hobbies)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedpassword
        })
        await ProfessionalData.create({
            email : req.body.email,
            linkedin : req.body.linkedin,
            company : req.body.company,
            skills : req.body.skills,
            work : req.body.work
        })
        await PersonalData.create({
            email : req.body.email,
            hobbies : req.body.hobbies,
            tShirt  : req.body.tShirt,
            weight : req.body.weight,
            height : req.body.height
        })
        res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: "error", error: "duplicate found" })
    }
})


app.post("/api/login", async (req, res) => {
    console.log(req.body)
    const user = await User.findOne({
        email: req.body.email,
    })
    console.log(user)
    if (user === null) return res.json({ status: "user not found" })
    else {
        const passwordcompared = await bcrypt.compare(req.body.password, user.password)
        if (!passwordcompared) return res.json({ status: "Incorrect Credentials" })
    }
    console.log(user)
    if (user) {
        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, process.env.Access_Token)
        return res.json({ status: "ok",name : user.name, email:user.email, token })
    }
    else {
        return res.json({ status: "error", user: false })
    }

})


app.post("/api/professionaldata", AuthenticationToken, async (req, res)=>{
    console.log(req.body.emails)
    if(req.user){
    try {
        await ProfessionalData.findOneAndUpdate({
            email: req.body.email},{
            linkedin : req.body.linkedin,
            company : req.body.company,
            skills : req.body.skills,
            work : req.body.work
        },
        { new: true } 
        );
    } catch (error) {
        console.log(error )
        if (error)
        return res.json({status : "error"})
    }
    return res.json({status : "ok"})}
    return res.json({status : "error"})

})
app.post("/api/personadata", AuthenticationToken, async (req, res)=>{
    console.log(req.body.email)
    if(req.user){
        try {
        await PersonalData.findOneAndUpdate({
            email: req.body.email},{
            hobbies : req.body.hobbies,
            tShirt  : req.body.tShirt,
            weight : req.body.weight,
            height : req.body.height
        },
        { new: true } 
        );
    } catch (error) {
        console.log(error )
        if (error)
        return res.json({status : "error"})
    }
    return res.json({status : "ok"})}
    return res.json({status : "error"})

})

function AuthenticationToken(req, res, next) {
    const token = req.body.token
    console.log(token)

    if (token === null) {
        console.log("12qeq")
        return res.sendStatus(403)}

    jwt.verify(token, process.env.Access_Token, (err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(401)}
        else
        console.log(err)
        req.user = user
        next()
    })

}


app.post("/api/professionaldatafetch", AuthenticationToken, async (req, res) => {
    console.log(req.body)
    const user = await ProfessionalData.findOne({
        email: req.body.email,
    })
    if (user) return res.json({status : "ok", user})
    return res.json({status: "err"})
}
)


app.post("/api/personaldatafetch", AuthenticationToken, async (req, res) => {
    console.log(req.body)
    const user = await PersonalData.findOne({
        email: req.body.email,
    })
    if (user) return res.json({status : "ok", user})
    return res.json({status: "err"})
}
)
app.post("/api/finduserpersonaldata", async (req, res) => {
    console.log(req.body)
    const user = await PersonalData.find({
        height : req.body.height,
        weight : req.body.weight,
        tShirt : req.body.tShirt,
        hobbies : req.body.hobbies
    })
    console.log(user)
    if (user) return res.json({status : "ok", user})
    return res.json({status: "err"})
}
)

app.post("/api/findusersprofessionaldata", async (req, res) => {
    console.log(req.body)
    const user = await ProfessionalData.find({
        work : req.body.work,
        skills : req.body.skills,
        company : req.body.company
    })
    console.log(user)
    if (user) return res.json({status : "ok", user})
    return res.json({status: "err"})
}
)


app.listen(6969, () => {
    console.log("server started")
})