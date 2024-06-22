import * as Yup from "yup";

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(35).required("Please enter your restaurant name"),
  phone: Yup.string().min(10).max(10)
  .matches(phoneRegExp, 'Phone number is not valid')
  .required('Phone number is required'),
  email: Yup.string().email().required("Please enter your email"),
  upi_id: Yup.string()
  .matches(/^[\w.-]+@[\w.-]+$/, 'Invalid UPI ID format')
  .required('UPI ID is required'),
terms: Yup.boolean()
.oneOf([true], 'You must accept the terms and conditions')
.required('Acceptance of terms and conditions is required'),
  // check:Yup.boolean()
  // .required('You must accept the terms and conditions')
  // .oneOf([true], 'You must accept the terms and conditions'),
});
