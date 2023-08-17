import React, { useEffect, useState } from 'react'
import './pay.scss'
import newRequest from '../../utils/newRequest'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"
import {useParams} from 'react-router-dom'
import CheckoutForm from '../../components/checkoutform/CheckoutForm';

const stripePromise = loadStripe("pk_test_51Nfg2KCKZ5C2Qjb0yEsWLfDGwmCVIJQ78eEBKAcWEJTUlidm0cN8GQBoCy59UnDzV92EuDHkzKt6yyDmL44tBUbc00TApGl40S");

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("")
  const {id} = useParams()
  useEffect(()=>{
    const makeRequest = async ()=>{
      try {
        const res = await newRequest.post(`orders/create-payment-intent/${id}`)
        setClientSecret(res.data.clientSecret)
      } catch (error) {
        console.log(error);
      }
    }
    makeRequest()
  },[])
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className='pay'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Pay