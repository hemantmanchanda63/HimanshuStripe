// server.js
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const connection = require("./Connection");
const { loadStripe } = require("@stripe/stripe-js");
const User = require('./model/stripedata');

app.use(express.json());

app.post("/create-subscription", async (req, res) => {
  try {
    if (req.method != "POST") {
      return res.status(400).json({ Message: "This is a POST request" });
    }
    const { name, email, paymentMethod } = req.body;
    console.log(paymentMethod, 'this is the payment Method')
    // Create a customer
    const customer = await stripe.customers.create({
      email,
      name,
      payment_method: paymentMethod,
      invoice_settings: { default_payment_method: paymentMethod },
    });
    // Create a PRODUCT
    const product = await stripe.products.create({
      name: "Monthly Subscription",
    });
    // Create a Subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: "INR",
            product: product.id,
            unit_amount: "500",
            recurring: { interval: "month" },
          },
        },
      ],
      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice.payment_intent"],
    });
    const data = {
      Message: "Subscription Successfull",
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      subscriptionID: subscription.id,
    }
    const data1 = new User({
      name:req.body.name,
      email:req.body.email,
      Message: "Subscription Successfull",
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      subscriptionID: subscription.id,
    })
    await data1.save()
    res.json(data);
    console.log(data1, 'here is the data')
  } catch (error) {
    console.log("Error creating subscription:", error);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

