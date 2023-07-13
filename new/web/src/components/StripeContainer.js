import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51NSecNSE97kHo9rWfPdDd0DSd4U1Ok3HmK1jo8QL3ftjigt6PK68DKtSo0DPMIbYEi73LSzg3vvHhCuuioI7raDP00YrePpvz8"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}
