import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentForm(props) {
  console.log(props)
  const stripe = useStripe();
  const elements = useElements();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [success, setSuccess]= useState(false)

  const { name, email } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const createSubscription = async () => {
    try {
      const payment_method = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement("card"),
      });
      console.log(payment_method.paymentMethod.id, "payment method");
      const response = await axios.post(
        "/create-subscription",
        { name, email, paymentMethod: payment_method.paymentMethod.id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const { error } = await stripe.confirmCardPayment(
          response.data.clientSecret
        );
        if (error) {
          alert("Payment Unsuccessful");
        } else {
          alert("Payment Successful");
          setSuccess(true)
        }
        console.log(response);
      }
    } catch (err) {
      console.log(err);
      alert("Subs Failed");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createSubscription();
  };

  useEffect(()=>{
    if(success === true){
      window.location.reload();
    }
  },[success])

  return (
    <form onSubmit={handleSubmit}>
      Name:
      <input type="text" value={name} name="name" onChange={handleChange} />
      Email:{" "}
      <input type="email" name="email" value={email} onChange={handleChange} />
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Subscribe INR 5
      </button>
    </form>
  );
}
