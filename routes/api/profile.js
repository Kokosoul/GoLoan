const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile')
const User = require('../../models/User')


//@route    GET api/profile/me
//@desc     Test route
//@access   Public
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' })
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', [
    auth,
    [check('bio', 'Bio is required').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            bio,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Build Profile Object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (bio) profileFields.bio = bio;
        // Build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, upsert: true })
            return res.json(profile)
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    })


// @route   GET api/profile
// @desc    GET all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')

    }
});


// @route   GET api/profile/user/:user_id
// @desc    GET profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])
        if (!profile) return res.status(400).json({ msg: "Profile not found" })
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: "Profile not found" })
        }
        res.status(500).send('Server Error')
    }
});


// @route   DELETE api/profile/
// @desc    DELETE profile, user & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // @todo - remove users posts

        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')

    }
});


// @route   PUT api/profile/loan
// @desc    Add profile loan
// @access  Private

router.put('/loan', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('from', 'Loan start date is required').not().isEmpty(),
    check('to', 'Loan end date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        title,
        description,
        relationship,
        accountReceivable,
        accountPayable,
        interestRate,
        totalReceived,
        totalPayed,
        from,
        to,
    } = req.body;

    const newLoan = {
        title,
        description,
        relationship,
        accountReceivable,
        accountPayable,
        interestRate,
        totalReceived,
        totalPayed,
        from,
        to,
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.loan.unshift(newLoan);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500), send('Server Error')
    }

})


// @route   DELETE api/profile/loan/:loan_id
// @desc    DELETE loan from profile
// @access  Private
router.delete('/loan/:loan_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // get remove index
        const removeIndex = profile.loan.map(item => item.id).indexOf(req.params.loan_id);
        profile.loan.splice(removeIndex, 1);
        await profile.save();
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500), send('Server Error')
    }
})

module.exports = router;