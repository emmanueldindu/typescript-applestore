
import { loadStripe, Stripe } from "@stripe/stripe-js";

// https://vercel.com/guides/getting-started-with-nextjs-typescript-stripe#loading-stripe.js
// Singleton Pattern
let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_test_51Lotg1BxLIxXZCymb3nHGSjEfDnIBGY51OSazPVy7dR0n2heZcPvtqDNGgwNVhYBqjOmYC0NwD9V9nDxuUP1BrhB008WXGfigF');
  }
  return stripePromise;
};

export default getStripe;