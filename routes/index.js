const router = require('express').Router();

router.use('/account', require('./users/userLogin'))
router.use('/account', require('./users/userSignup'))
router.use('', require('./items/items'))
router.use('', require('./competition/competition'))

module.exports = router;