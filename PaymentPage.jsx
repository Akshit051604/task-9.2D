// src/PaymentPage.jsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentPage.css';

function PaymentPage() {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const { paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    setSucceeded(true);
    setProcessing(false);
    console.log('[PaymentMethod]', paymentMethod);
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Complete Your Payment</h2>
        <div className="payment-details">
          <h3>Premium Plan</h3>
          <p>Rs 100/month</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-element-container">
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
          {succeeded && (
            <div className="success-message">
              Your subscription is now active.
            </div>
          )}
          <button 
            type="submit" 
            disabled={!stripe || processing || succeeded}
            className="payment-button"
          >
            {processing ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;
