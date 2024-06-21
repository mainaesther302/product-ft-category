import Joi from 'joi';

export const RegisterSchema = Joi.object({
  Name: Joi.string().required().messages({
    'any.required': 'Name is required'
  }),
  Email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address',
    'any.required': 'Email is required'
  }),
  Password: Joi.string().required().pattern(
    new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})")
  ).messages({
    'string.pattern.base': 'Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character',
    'any.required': 'Password is required'
  })
});
