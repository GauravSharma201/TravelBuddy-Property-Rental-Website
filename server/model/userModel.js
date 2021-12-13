import mongoose from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, `can't leave this emtpy, please type a valid entry`],
    minlength: [3, `should be atleast 3 characters long`],
    maxlength: [30, `character exceeds the allowed limit`],
  },
  email: {
    type: String,
    required: [true, `can't leave this empty`],
    validate: [validator.isEmail, `please enter a valid email id`],
    unique: true,
  },
  password: {
    type: String,
    required: [true, `can't leave this empty`],
    minlength: [8, `should be atleast 8 characters long`],
    select: false,
  },
  address: {
    type: String,
    required: [true, `can't leave this empty`],
    minlength: [9, `should be atleast 9 characters long`],
  },
  created_At: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: 'user',
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
})

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
  } catch (error) {
    console.log(error)
  }
})

userSchema.methods.getJWToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

userSchema.methods.comparePassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password)
    return match
  } catch (error) {
    console.log(error)
  }
}

userSchema.methods.getResetPasswordToken = function () {
  let resetPassToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = crypto
    .createHash('SHA256')
    .update(resetPassToken)
    .digest('hex')
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
  return resetPassToken
}

const user = new mongoose.model('user', userSchema)
export default user
