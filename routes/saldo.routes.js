const router = require("express").Router();
const UserModel = require("../models/User.model")
const generateToken = require("../config/jwt.config");
const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const isAdmin = require("../middlewares/isAdmin");
const bcrypt = require("bcrypt");


router.post("/transfer", isAuth, attachCurrentUser, async (req, res) => {
    try {

        const findUser = await UserModel.findOne({_id: req.currentUser})
        const novoSaldo = await UserModel.findOneAndUpdate({_id: req.currentUser}, {saldo: findUser.saldo + req.body.credito})

        return res.status(201).json(novoSaldo);
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
});

module.exports = router;



