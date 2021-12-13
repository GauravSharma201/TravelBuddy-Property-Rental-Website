import booking from '../model/bookingModel.js'
import property from '../model/propertyModel.js'

export const createBooking = async (req, res, next) => {
  try {
    let bookingData = {
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      name: req.body.name,
      guests: req.body.guests,
      propertyId: req.body.propertyId,
      userId: req.user.id,
      phoneNumber: req.body.phoneNumber,
      totalPrice: req.body.totalPrice,
      paymentId: req.body.paymentId,
      paymentStatus: req.body.paymentStatus,
      propertyImg: req.body.propertyImg,
    }
    let response = await booking.create(bookingData)
    let propertyRes = await property.findById(req.body.propertyId)
    req.body.disabledDates.map((elem) => {
      propertyRes.bookedDates.push(elem)
    })
    await propertyRes.save({ validateBeforeSave: false })
    res.status(201).json({ response, success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const cancelBooking = async (req, res, next) => {
  try {
    let response = await booking.findById(req.body.bookingId)
    if (!response) {
      return res.status(404).json({ message: `no booking with this id` })
    }

    let currentDate = new Date.now()
    let difference = currentDate - response.created_At
    console.log(difference)
    if (difference > 7) {
      return res.status(400).json({
        message: `can't process the request, booking exceeds the cancellation period`,
      })
    }
    await response.remove()
    res
      .status(200)
      .json({ success: true, message: `booking cancellation successfull` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getMyBookings = async (req, res, next) => {
  try {
    let response = await booking.find()
    let result = []
    if (response) {
      response.map((elem) => {
        if (elem.userId.toString() === req.user.id.toString()) {
          return result.push(elem)
        }
      })
    }
    res.status(200).json({ response: result, success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getMyPropBooking = async (req, res, next) => {
  try {
    let response = await booking.find({ propertyId: req.params.id })
    res.status(200).json({ response, success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
