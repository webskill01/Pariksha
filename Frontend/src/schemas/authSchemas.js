// Frontend/src/schemas/authSchemas.js

import * as yup from 'yup'

// Login schema - using roll number
export const loginSchema = yup.object({
  rollNumber: yup
    .string()
    .required('Roll number is required')
    .min(1, 'Roll number cannot be empty'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

// Register schema - with year field added
export const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Enter a valid email address')
    .required('Email is required'),
  rollNumber: yup
    .string()
    .required('Roll number is required')
    .min(1, 'Roll number cannot be empty'),
  class: yup
    .string()
    .required('Class is required'),
  semester: yup
    .string()
    .required('Semester is required'),
  year: yup  // Added year validation
    .string()
    .required('Year is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
})

export const paperUploadSchema = yup.object({
  title: yup
    .string()
    .min(10, 'Title must be at least 10 characters')
    .max(100, 'Title must be less than 100 characters')
    .required('Paper title is required'),
  subject: yup
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .required('Subject is required'),
  class: yup
    .string()
    .required('Class is required'),
  semester: yup
    .string()
    .required('Semester is required'),
  year: yup
    .string()
    .required('Year is required'),
  examType: yup
    .string()
    .oneOf(['Mst-1', 'Mst-2', 'Final'], 'Please select a valid exam type')
    .required('Exam type is required'),
  tags: yup
    .array()
    .of(yup.string())
    .max(5, 'Maximum 5 tags allowed'),
  file: yup
    .mixed()
    .required('Please select a PDF file')
    .test('fileType', 'Only PDF files are allowed', (value) => {
      if (!value) return false
      return value.type === 'application/pdf'
    })
    .test('fileSize', 'File size must be less than 8MB', (value) => {
      if (!value) return false
      return value.size <= 8 * 1024 * 1024 // 8MB
    }),
})