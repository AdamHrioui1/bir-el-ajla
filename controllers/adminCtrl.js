const Admin = require("../models/adminModel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const adminCtrl = {
    // register: async (req, res) => {
    //     try {
    //         const { name, email, password } = req.body
    //         const salt = 10
    //         const hashedPassword = await bcrypt.hash(password, salt)
    //         const admin = new Admin({
    //             name, email, password: hashedPassword
    //         })

    //         await admin.save()
    //         return res.json({ admin: admin })
            
    //     } catch (err) {
    //         return res.status(500).json({ msg: err.message})
    //     }
    // },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const admin = await Admin.findOne({ email })
            if(!admin) return res.status(400).json({ msg: "Email not found!!" })

            const isMatch = await bcrypt.compare(password, admin.password)
            if(!isMatch) return res.status(400).json({ msg: "Incorrect password!!" })

            const accesstoken = createAccessToken({id: admin._id })
            const refreshtoken = createRefreshToken({ id: admin._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/admin/refreshtoken'
            })

            res.json({ accesstoken })

        } catch (err) {
            return res.status(500).json({ msg: err.message})
        }
    },
    refreshToken: async (req, res) => {
        try {
            const refreshtoken = req.cookies.refreshtoken
            if(!refreshtoken) return res.status(400).json({ msg: 'Invalid Authentication!' })

            jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({ msg: 'Invalid Authentication!' })

                const accesstoken = createAccessToken({ id: user.id })
                return res.json({ accesstoken })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/admin/refreshtoken'})
            return res.json({ msg: 'logout successfuly' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

const createAccessToken = (id) => {
    return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (id) => {
    return jwt.sign(id, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = adminCtrl