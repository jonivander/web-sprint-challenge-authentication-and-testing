const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');

router.get('/', restricted, /*checkDepartment('user'),*/ (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.send(err));
});

function checkDepartment(department) {
    return (req, res, next) => {
        if (req.jwt.department === department) {
            next();
        } else {
            res.status(403).json({ message: "You do not have the authorization" });
        }
    };
}

module.exports = router; 