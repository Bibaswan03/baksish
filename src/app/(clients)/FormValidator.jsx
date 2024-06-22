import * as Yup from "yup";

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(35).required("Please enter your restaurant name"),
  phone: Yup.string().min(10).max(10)
  .matches(phoneRegExp, 'Phone number is not valid')
  .required('Phone number is required'),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirmpassword: Yup.string()
    .required("please re enter password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
    state: Yup.string().min(2).max(35).required("Please enter your state"),
    city: Yup.string().min(2).max(35).required("Please enter your city"),
  // check:Yup.boolean()
  // .required('You must accept the terms and conditions')
  // .oneOf([true], 'You must accept the terms and conditions'),

});
export const signInSchema = Yup.object({
  Username: (Yup.string().min(2).max(35).required("Please enter your Username")),
  password: Yup.string().min(6).required("Please enter your password"),

});
