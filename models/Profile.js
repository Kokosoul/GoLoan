const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    bio: {
        type: String,
        required: true
    },
    loan: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        relationship: {
            type: String
        },
        accountReceivable: {
            type: Number
        },
        accountPayable: {
            type: Number
        },
        interestRate: {
            type: Number
        },
        totalReceived: {
            type: Number
        },
        totalPayed: {
            type: Number
        },
        from: {
            type: Date,
            default: Date.now,
            required: true
        },
        to: {
            type: Date,
            required: true
        }
    }],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema)