import './checkout-form.scss';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Form from '../Account/Form';
import cupcake from '../../assets/icons/cupcake.png';
import cupcakeClose from '../../assets/icons/cupcake-close.png';
import coffee from '../../assets/icons/coffee.png';
import Button from '../Button';
import { REMOVE_CART } from '../../actions/shop';

export default function CheckoutForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [ success, setSuccess ] = useState(false);
  const [ message, setMessage ] = useState('');
  const [ image, setImage ] = useState(cupcake);
  const cart = useSelector(state => state.shop.cart);
  const state = useSelector(state => state);

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    console.log(error)
    if (!error) {
      try {
        console.log('[PaymentMethod]', paymentMethod);
        const { id } = paymentMethod;
        const response = await axios.post("https://chibi-api.herokuapp.com/createCheckoutSession", { 
          cart,
          id,
        });

        if(response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
          try {
            const responseOrder = await axios.post("https://chibi-api.herokuapp.com/order", { 
              state
            });
            if(responseOrder.data.id) {
              console.log("success", responseOrder);
              localStorage.setItem("lastOrder", JSON.stringify(responseOrder.data));
              dispatch({type: REMOVE_CART});
              localStorage.removeItem("cart");
              history.push('/confirmation')
            }
          } catch (error) {
            console.log('error', error)
          }
        } else {
          console.log(response)
          setMessage(response.data.message)
        }
      } catch (error) {
        console.log('error', error)
      }
    } else {
      console.log('[error]', error.message);
      setMessage(error.message)
    }
  };

  const handleFocus = () => {
    setImage(cupcakeClose);
  }

  return (
    <div className="checkout">
    {!success ?
      <Form handleSubmit={handleSubmit}>
        <div className="checkout__message">
        {message? 
          <>
            <p className="checkout__text">
              {message}
            </p> 
            <img className="checkout__image" src={coffee} alt="icon café"/> 
          </> :
          <img className="checkout__cupcake" src={image} alt="icon cupcake"/>
        }
        </div>        
        <h2 className="center">Veuillez renseigner votre carte de paiement</h2>
        <fieldset className="checkout__form-group">
          <div className="checkout__form-row">
            <CardElement 
              onChange={handleFocus}
              options={{
                iconStyle: "solid",
                style: {
                    base: {
                        iconColor: "#c4f0ff",
                        color: "#fff",
                        fontWeight: 500,
                        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                        fontSize: "16px",
                        fontSmoothing: "antialiased",
                        ":-webkit-autofill": { color: "#fce883" },
                        "::placeholder": { color: "#87bbfd" }
                    },
                    invalid: {
                        iconColor: "#ffc7ee",
                        color: "#ffc7ee"
                    }
                }
              }} 
            />
          </div>
        </fieldset>
        <Button type="submit" disabled={!stripe}>Payer</Button>
      </Form> :
      <div>
        <h2>Paiement validé!</h2>
      </div>
    }
    </div>
  );
};