import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm";

const PUBLIC_KEY = "pk_test_51KiIbcA9uMX4IedOHAf1y4TS2szKjDwuouHW5WyFrW20MNqyQ6CZYuKhSd76D1HMvAYGPE7iILNmes52QMmMea7300VUPocbq9";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <CheckoutForm />
        </Elements>
    )
}
