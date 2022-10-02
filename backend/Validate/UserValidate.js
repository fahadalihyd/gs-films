import * as yup from 'yup';

// Just like before, without the id field
const userSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email(),
  password: yup.string().required()
});

export const userLoginSchema = yup.object({
  email: yup.string().email(),
  password: yup.string().required()
});

export default userSchema;