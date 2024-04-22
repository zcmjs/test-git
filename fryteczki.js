import { SharedArray } from 'k6/data';
import { http } from 'k6/http';

// Define the data to be stored in SharedArray
const initialData = {
  userId: 1,
  productId: 10,
  quantity: 2
};

// Create a SharedArray to store the data
const sharedData = new SharedArray('shared-data', function () {
  return initialData;
});

export default function () {
  // Fetch data from SharedArray
  const data = sharedData.data;

  // Simulate some user action using the data
  console.log(`User ${data.userId} wants to buy ${data.quantity} of product ${data.productId}`);

  // You could also perform an HTTP request to a server here, using the data

  // Update data in SharedArray (optional, for scenario variations)
  // sharedData.data = { ...data, userId: data.userId + 1 }; // Update user ID
}

export const options = {
  scenarios: {
    // Scenario with constant arrival rate
    my_scenario: {
      executor: 'constant-arrival-rate',
      rate: 20, // 20 iterations per second
      timeUnit: '1s', // Maintain this rate for 1 second
      duration: '30s', // Run the scenario for 30 seconds
    }
  }
};
