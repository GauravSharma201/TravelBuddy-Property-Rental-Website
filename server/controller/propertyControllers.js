import ApiFeatures from '../utlis/apiFeatures.js'
import property from '../model/propertyModel.js'
import user from '../model/userModel.js'
import cloudinary from 'cloudinary'

export const getAllProperty = async (req, res, next) => {
  try {
    let resultPerPage = 5
    let apiFeature = new ApiFeatures(property.find(), req.query)
      .search()
      .filter()
    let response = await apiFeature.query
    let numOfFilteredProperty = response.length
    apiFeature.pagination(resultPerPage)
    response = await apiFeature.query
    res.status(200).json({
      success: true,
      response,
      numOfFilteredProperty,
      message: `property fetched`,
      resultPerPage,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getPropertyDetails = async (req, res, next) => {
  try {
    let response = await property.findById(req.params.id)
    if (!response) {
      return res.status(404).json({ message: `property not found` })
    }
    let propertyHostId = response.user
    let userData = await user.findById(propertyHostId)
    let hostName = userData.name
    let imgUrl = userData.avatar.url
    res
      .status(200)
      .json({ response, success: true, host: hostName, hostImg: imgUrl })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// ***************************************** ADMIN ******************************
export const createProperty = async (req, res, next) => {
  try {
    req.body.user = req.user.id
    let images = req.body.images
    let length = images.length
    let upldedImgs = []

    for (let i = 0; i < length; i++) {
      let myCloud = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'properties',
        width: 150,
        crop: 'scale',
      })
      let img = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      }
      upldedImgs.push(img)
    }

    let propertyData = {
      title: req.body.title,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      amenities: req.body.amenities,
      description: req.body.description,
      shortDescription: req.body.shortDescription,
      images: upldedImgs,
      room: req.body.room,
      user: req.user.id,
      price: req.body.price,
      category: req.body.category,
      guests: req.body.guests,
    }
    let response = await property.create(propertyData)
    res.status(200).json({ response, success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getMyProperties = async (req, res, next) => {
  try {
    let user = req.user.id
    let response = await property.find({ user: user })
    res.status(200).json({ response, success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateProperty = async (req, res, next) => {
  try {
    let response = await property.findById(req.params.id)
    if (!response) {
      return res.status(404).json({ message: `property not found` })
    }
    let images = []
    images = req.body.images

    const imagesLinks = []

    if (images != undefined) {
      if (images[0].public_id) {
        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i].url, {
            folder: 'properties',
            public_id: images[i].public_id,
          })
          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          })
        }
      } else if (!images[0].public_id) {
        for (let i = 0; i < response.images.length; i++) {
          await cloudinary.v2.uploader.destroy(response.images[i].public_id, {
            folder: 'properties',
          })
        }
        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'properties',
          })
          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          })
        }
      }

      req.body.images = imagesLinks
    }

    response = await property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    })

    res.status(200).json({ success: true, response })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

export const deleteProperty = async (req, res, next) => {
  try {
    let response = await property.findById(req.params.id)
    if (!response) {
      return res.status(404).json({ message: `property not found` })
    }
    await response.remove()
    res
      .status(200)
      .json({ success: true, message: `property deleted successfully` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createReivew = async (req, res, next) => {
  try {
    let { rating, comment, propertyId } = req.body
    let review = {
      user: req.user._id,
      name: req.user.name,
      image: req.user.avatar.url,
      rating,
      comment,
    }
    let response = await property.findById(propertyId)
    let isReviewed = response.reviews.find(
      (elem) => elem.user.toString() === req.user._id.toString()
    )
    if (isReviewed) {
      response.reviews.forEach((elem) => {
        if (elem.user.toString() === req.user._id.toString())
          (elem.rating = rating), (elem.comment = comment)
      })
    } else {
      response.reviews.push(review)
      response.numOfReviews = response.reviews.length
    }
    let average = 0
    let length = response.reviews.length
    response.reviews.forEach((elem) => (average = average + elem.rating))
    response.ratings = average / length
    await response.save({ validateBeforeSave: false })
    res
      .status(200)
      .json({ response, reviews: response.reviews, ratings: response.ratings })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteReview = async (req, res, next) => {
  try {
    let response = await property.findById(req.query.propertyId)
    if (!response) {
      return res.status(404).json({ message: `property not found` })
    }
    let filteredReviews = response.reviews.filter(
      (elem) => elem._id.toString() !== req.query.id.toString()
    )
    let length = filteredReviews.length
    let ratings
    if (length == 0) {
      ratings = 0
    } else {
      let average = 0
      filteredReviews.forEach((elem) => (average = average + elem.rating))
      ratings = average / length
    }
    let numOfReviews = length
    let reviews = filteredReviews
    await property.findByIdAndUpdate(
      req.query.propertyId,
      { reviews, ratings, numOfReviews },
      { new: true, useFindAndModify: false, runValidators: true }
    )
    res.status(200).json({ success: true, message: `review deleted` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getAllReviews = async (req, res, next) => {
  try {
    let response = await property.findById(req.query.propertyId)
    if (!response) {
      return res.status(404).json({ message: `property not found` })
    }
    res.status(200).json({ reviews: response.reviews, success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
