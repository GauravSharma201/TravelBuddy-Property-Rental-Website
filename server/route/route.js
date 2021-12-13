import express from 'express'

// PROPERTY IMPORTS
import {
  getAllProperty,
  getPropertyDetails,
  createProperty,
  updateProperty,
  deleteProperty,
  createReivew,
  deleteReview,
  getAllReviews,
  getMyProperties,
} from '../controller/propertyControllers.js'

// USER IMPORTS
import {
  createUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUsers,
  getUserDetail,
  updateUserRole,
  deleteUser,
} from '../controller/userControllers.js'
import {
  authenticateUser,
  authenticateUserRole,
} from '../middleware/Authentication.js' //user middleware

import {
  processPayments,
  sendStripeApiKey,
} from '../controller/paymentControllers.js'

import {
  createBooking,
  getMyBookings,
  getMyPropBooking,
} from '../controller/bookingControllers.js'

const router = express.Router()

// USER ROUTES
router.post('/register', createUser) 
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.post('/password/forgot', forgotPassword)
router.put('/password/reset/:token', resetPassword)
router.get('/me', authenticateUser, getUserDetails)
router.put('/password/update', authenticateUser, updateUserPassword)
router.put('/me/update', authenticateUser, updateUserProfile)

//PROPERTY ROUTES
router.get('/properties', getAllProperty)
router.get('/property/:id', getPropertyDetails)
router.post(
  '/admin/property/new',
  authenticateUser,

  createProperty
)
router.put(
  '/admin/property/:id',
  authenticateUser,

  updateProperty
)
router.get(
  '/admin/property/myProperty',
  authenticateUser,

  getMyProperties
)
router.get(
  '/admin/property/myProperty/:id',
  authenticateUser,

  getMyPropBooking
)
router.put('/review', authenticateUser, createReivew)
router.delete('/reviews', authenticateUser, deleteReview)
router.get('/reviews', getAllReviews)

// BOOKING ROUTES
router.post('/booking', authenticateUser, createBooking)
router.get('/me/bookings', authenticateUser, getMyBookings)

//PAYMENT ROUTES
router.post('/payment/process', authenticateUser, processPayments)
router.get('/stripeApiKey', authenticateUser, sendStripeApiKey)

// ADMIN
// router.post('/admin', adminLogin)
// router.get(
//   '/admin/user',
//   authenticateAdmin,
//   // authenticateUserRole('admin'),
//   getAdminDetails
// )
router.get(
  '/admin/users',
  authenticateUser,
  authenticateUserRole('admin'),
  getAllUsers
)
router.get(
  '/admin/user/:id',
  authenticateUser,
  authenticateUserRole('admin'),
  getUserDetail
)
router.put(
  '/admin/user/:id',
  authenticateUser,
  authenticateUserRole('admin'),
  updateUserRole
)
router.delete(
  '/admin/user/:id',
  authenticateUser,
  authenticateUserRole('admin'),
  deleteUser
)
router.delete(
  '/admin/property/:id',
  authenticateUser,
  authenticateUserRole('admin'),
  deleteProperty
)

export default router
