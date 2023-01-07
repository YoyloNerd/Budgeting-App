const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/accounting', require('./accounting'))
module.exports = router;