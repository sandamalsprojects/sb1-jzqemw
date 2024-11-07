import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const createPaymentSession = async (
  product: Product,
  quantity: number
) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize');

    const response = await fetch('/api/create-payment-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product,
        quantity,
        stripe_account: product.stripe_account_id,
        commission_rate: product.vendor_commission,
      }),
    });

    const session = await response.json();
    
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};