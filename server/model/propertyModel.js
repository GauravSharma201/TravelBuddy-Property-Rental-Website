import mongoose from 'mongoose'

const propertySchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, `cannot leave this empty`],
    minlegth: [5, `should have atleast 5 characters`],
    maxlength: [30, `cannot exceed the given character limit`],
  },
  address: {
    type: String,
    required: [true, `cannot leave this empty`],
    minlegth: [5, `should have atleast 5 characters`],
    maxlength: [60, `cannot exceed the given character limit`],
  },
  pincode: {
    type: Number,
    minlegth: [4, `please enter a valid pincode`],
    maxlength: [6, `please enter a valid pincode`],
  },
  city: {
    type: String,
    required: [true, `cannot leave this empty`],
  },
  state: {
    type: String,
    required: [true, `cannot leave this empty`],
  },
  country: {
    type: String,
    required: [true, `cannot leave this empty`],
  },
  geographicalLoc: {
    lattitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  amenities: {
    ac: {
      name: { type: String, default: 'ac' },
      value: { type: Boolean, default: false },
    },
    swimming: {
      name: { type: String, default: 'swimming' },
      value: { type: Boolean, default: false },
    },
    jaccozi: {
      name: { type: String, default: 'jaccozi' },
      value: { type: Boolean, default: false },
    },
    parking: {
      name: { type: String, default: 'parking' },
      value: { type: Boolean, default: false },
    },
    wifi: {
      name: { type: String, default: 'wifi' },
      value: { type: Boolean, default: false },
    },
    food: {
      name: { type: String, default: 'food' },
      value: { type: Boolean, default: false },
    },
    tv: {
      name: { type: String, default: 'tv' },
      value: { type: Boolean, default: false },
    },
    bar: {
      name: { type: String, default: 'bar' },
      value: { type: Boolean, default: false },
    },
    gym: {
      name: { type: String, default: 'gym' },
      value: { type: Boolean, default: false },
    },
  },

  description: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'user',
      },
      name: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      image: { type: String },
      creation_Date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  room: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: [true, `cannot leave this empty`],
  },
  category: {
    type: String,
  },
  user: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'user',
  },
  guests: {
    type: Number,
    default: 1,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  bookedDates: [],
})

const property = new mongoose.model('property', propertySchema)

export default property
