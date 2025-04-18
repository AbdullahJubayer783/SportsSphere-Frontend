// import React from 'react';

// const Payment_success = () => {
    
//     return (
//         <div>
//             {/* fsdfdsf---{pathArray} */}
//             ----fsdfdsf 
//         </div>
//     );
// };

// export default Payment_success;

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Payment_success = () => {
  const transactionId = window.location.pathname.split('/')[3];
  const [payment, setPayment] = useState(null);
  console.log(transactionId);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/payments/api/payment/${transactionId}/`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        
        const data = await response.json();
        setPayment(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchOrderDetails();
  }, [transactionId]);

  return (
    <div>
      <h2>✅ Payment Successful</h2>
      {payment ? (
        <div>
          <p><strong>Transaction ID:</strong> {payment.transaction_id}</p>
          <p><strong>Amount:</strong> {payment.amount} BDT</p>
          <p><strong>Status:</strong> {payment.status}</p>
          <p><strong>Card:</strong> {payment.card_type}</p>
          <p><strong>Customer:</strong> {payment.customer_name}</p>
          <p><strong>Email:</strong> {payment.customer_email}</p>
          <p><strong>Date:</strong> {new Date(payment.date).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
};

export default Payment_success;
