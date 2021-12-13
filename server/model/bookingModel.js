import mongoose from 'mongoose'

const bookingSchema = mongoose.Schema({
  checkIn: {
    type: Date,
    required: [true, `can't leave this empty`],
  },
  checkOut: {
    type: Date,
    required: [true, `can't leave this empty`],
  },
  name: {
    type: String,
    required: [true, `can't leave this empty`],
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  guests: {
    type: Number,
    default: 1,
  },
  propertyId: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'property',
  },
  propertyImg: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'user',
  },
  paymentId: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  created_At: {
    type: Date,
    default: Date.now(),
  },
})

let booking = mongoose.model('booking', bookingSchema)

export default booking
