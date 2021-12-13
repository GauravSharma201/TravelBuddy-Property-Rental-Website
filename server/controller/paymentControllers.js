import Stripe from 'stripe'

const stripe = new Stripe(
  'sk_test_51JrPJcSIF9xQJLiGaokJ71iOdjIPtulxlw2g6ryUqgb9ODG6ePNXFsZewapsEczgQtJrpcbi1N39ypCdIZAHvhkE009cyBWkfV'
)
export const processPayments = async (req, res, next) => {
  // try {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'inr',
    metadata: {
      company: 'TravelBuddy',
    },
  })
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret })
  // } catch (error) {
  //   res
  //     .status(500)
  //     .json({ error: error.message, message: `from processPayments` })
  // }
}

export const sendStripeApiKey = async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_PUB_KEY })
}
