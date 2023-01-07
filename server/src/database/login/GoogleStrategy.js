const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const uuidv1 = require('uuid').v1;
const Account = require('../schema/Account');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser(async (uuid, done) => {
    try {
        const user = await Account.findOne({ uuid });
        return user ? done(null, user) : done(null, null);
    } catch (err) {
        console.log(err)
        return done(err, null);
    }
});

passport.use('google', new GoogleStrategy({
    clientID: process.env.OAUTH_GOOGLE_ID,
    clientSecret: process.env.OAUTH_GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URL,
    passReqToCallback: true,
    scope: ['profile'],
    state: true,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    const { id, displayName } = profile;
    
    try {
        const findUser = await Account.findOne({ googleID: id })
        if (findUser) {
            return done(null, findUser.uuid);
        } else {
            const uuid = uuidv1();
            const tempMonths = [];
            for (let i = 0; i < 12; i++) {
                tempMonths.push({
                    month: months[i],
                    balance: 0,
                    monthlyIncome: [],
                    monthlyExpenses: [],
                    transactions: []
                })
            }
            const tempYears = [{
                year: new Date().getFullYear(),
                months: tempMonths
            }]
            const tempAccounts = [{
                name: "Main Account",
                years: tempYears
            }]

            const newUser = await Account.create({
                googleID: id,
                uuid,
                displayName,
                accounts: tempAccounts
            })
            return done(null, newUser.uuid)
        }
    } catch (err) {
        console.log(err);
        return done(err, null)
    }
}));