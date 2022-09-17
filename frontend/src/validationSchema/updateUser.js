import * as Yup from 'yup'

export const updateUser = Yup.object({
    email: Yup.string().email().required("Enter Your Email"),
    firstName: Yup.string().min(3).max(25).required("Please Enter your First Name"),
    lastName: Yup.string().min(3).max(25).required("Please Enter your Last Name"),
    address: Yup.string().max(30).required("Please Enter your Address"),
    phoneNo: Yup.string().max(11).min(11).required("Please Enter your Phone Number")
})