// src/PricingPlans.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './PricingPlans.css';

function PricingPlans() {
  return (
    <div className="pricing-container">
      <h2>Choose Your Plan</h2>
      <div className="plans-wrapper">
        <div className="plan-card">
          <h3>Free Plan</h3>
          <div className="price">Rs 0/month</div>
          <ul>
            <li>Basic features</li>
            <li>Limited article access</li>
          </ul>
          <button className="plan-button">Current Plan</button>
        </div>

        <div className="plan-card premium">
          <h3>Premium Plan</h3>
          <div className="price">Rs 100/month</div>
          <ul>
            <li>Unlimited posts</li> 
            <li>Custom themes</li>
          </ul>
          <Link to="/payment">
            <button className="plan-button premium-button">Upgrade Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PricingPlans;