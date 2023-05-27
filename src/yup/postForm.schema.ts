import * as yup from 'yup'

export const postFormSchema = {
  content: yup
    .string()
    .required('Это поле обязательно!')
    .min(4, 'Это поле должно быть не менее 4 символов!')
    .max(1000, 'Это поле должно быть не более 1000 символов!'),
}
