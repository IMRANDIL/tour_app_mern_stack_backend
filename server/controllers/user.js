const User = require('../models/user');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');




//signup controller...

exports.signupUser = async (req, res) => {
    //extract data...

    const { firstName, lastName, email, password } = req.body;

    //now some validation..

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).send(`All fields are required!`)
    }


    //now check user...if already exist in the db...

    try {
        const isUserExist = await User.findOne({ email }).exec();

        if (isUserExist) {
            return res.status(400).send(`Email Already EXists! Please Login`)
        }



        //now hash the password...

        const hashPass = await bcrypt.hash(password, 12);




        //now user is not there in the db...create one user...




        const user = await User.create({
            name: `${firstName} ${lastName}`,
            email,
            password: hashPass

        });


        //generate a token now....

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET, { expiresIn: '1h' });

        //now send the response...

        res.status(201).json({ name: user.name, email: user.email, _id: user._id, token: token })




    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }


}




//login controller....


exports.loginUser = async (req, res) => {
    //extract data from the body...

    const { email, password } = req.body;

    //some validation...

    if (!email || !password) {
        return res.status(400).send(`All fields required!`)
    }

    //now check if user exists not in db...

    try {

        const isUserExist = await User.findOne({ email }).exec();

        if (!isUserExist) {
            return res.status(404).send(`User not found!`)
        }


        //now if there is user....verify the password...

        const isPassMatch = await bcrypt.compare(password, isUserExist.password);


        //now validation again..

        if (!isPassMatch) {
            return res.status(401).send(`Invalid Credentials`)
        }


        //now the password matches....so send the response now..create a token now...

        const token = jwt.sign({ email: isUserExist.email, id: isUserExist._id }, process.env.SECRET, { expiresIn: '1h' })

        //now send the response...

        res.status(200).json({ email: isUserExist.email, _id: isUserExist._id, name: isUserExist.name, token: token })



    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}
