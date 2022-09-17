import * as Yup from 'yup'

export const AddNewItem = Yup.object({
    images: Yup.string().required("Kindly give some images link"),
    price: Yup.number().required("Mention Price"),
    description: Yup.string().required("Description is necessary"),
    size: Yup.string().required("Enter Size"),
    stuff: Yup.string().required("What's the Stuff?"),
    guidelines: Yup.string().required("Do you mind some Guidelines?"),
    catagory: Yup.string().required("What's the Catagory"),
    name: Yup.string().required("Product Name?"),
    color: Yup.string().required("What's the Color")
})