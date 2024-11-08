import React from 'react';
import './App.css';
import Movies from './routes/TextHomepage.jsx';
import Post from './routes/Post';
import PricingPlans from './PricingPlans';  // Import PricingPlans component
import PaymentPage from './PaymentPage';    // Import PaymentPage component
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './NavigationBar.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QFrbwA5G82ApbJcSl2mxSLNaM5k6PPae9c8vDuZZwDsf99OWXGHEK81fzA72dkG7MFib4yAf8HWaQCN3chNwGQi00jQulUW3Y'); // Replace with your Stripe publishable key

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Routes>
        <Route path='/' element={<NavigationBar />}>
          <Route index element={<Movies />} />
          <Route path='plans' element={<PricingPlans />} />
          <Route path='post' element={<Post />} />
          <Route path='payment' element={<PaymentPage />} />
        </Route>
      </Routes>
    </Elements>
  );
}

export default App;
