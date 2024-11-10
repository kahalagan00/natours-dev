/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51QJNj4KXU3G1bVf7KUBRiSlum1YeXAy5tsCB1iKQESwmchg8Sx7Zp99pDGuyvVufcrGyK2K7m5eHYLI0lJUhPcxj00TsNrksje'
  );
  try {
    // 1. Get checkout session from the API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);

    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
