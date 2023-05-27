import * as yup from 'yup'

export const loginFormSchema = {
  email: yup
    .string()
    .required('Это поле обязательно!')
    .email('Это поле должно содержать Email!'),
  password: yup.string().required('Это поле обязательно!'),
}
