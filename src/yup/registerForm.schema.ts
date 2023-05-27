import * as yup from 'yup'

export const registerFormSchema = {
  email: yup
    .string()
    .required('Это поле обязательно!')
    .email('Это поле должно содержать Email!'),
  username: yup
    .string()
    .required('Это поле обязательно!')
    .matches(/^[a-zA-Z0-9]+$/g, 'Это поле должно содержать только a-Z и 0-9!')
    .min(4, 'Это поле должно быть не менее 4 символов!')
    .max(18, 'Это поле должно быть не более 18 символов!'),
  password: yup
    .string()
    .required('Это поле обязательно!')
    .min(8, 'Это поле должно быть не менее 8 символов!')
    .max(36, 'Это поле должно быть не более 36 символов!'),
  passwordRepeat: 'confirmed:password',
}
