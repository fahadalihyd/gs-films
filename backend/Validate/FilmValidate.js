import * as yup from 'yup';

// Just like before, without the id field
const filmSchema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  release_date: yup.date().required(),
  rating: yup.number().min(0).max(5).default(0).required(),
  ticket_price: yup.number().positive().required(),
  country: yup.string().required(),
  genres: yup.array().default([]),
//  photo: yup.string().required(),
});

export default filmSchema;