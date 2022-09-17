import * as Yup from 'yup'

export const schema = Yup.object({
    email: Yup.string().email().required("Enter Your Email"),
    password: Yup.string().required("Enter Your Password")
})