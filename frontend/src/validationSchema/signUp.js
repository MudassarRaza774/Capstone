import * as Yup from 'yup'

export const schema = Yup.object({
    firstName: Yup.string().min(3).max(25).required("Please Enter your First Name"),
    lastName: Yup.string().min(3).max(25).required("Please Enter your Last Name"),
    email: Yup.string().email().required("Please Enter your Email"),
    password: Yup.string().min(8).required("Please Enter your Password").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    userName: Yup.string().min(6).max(15).required("Please Enter your unique User Name"),
    address: Yup.string().max(30).required("Please Enter your Address"),
    phoneNo: Yup.string().max(11).min(11).required("Please Enter your Phone Number")
})