import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('https://localhost:7298/api/payments');
      debugger;
      setPayments(response.data.value);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const updatePaymentStatus = async (paymentId, newStatus) => {
    try {
        let paymentData = JSON.parse(localStorage.getItem('paymentData'));
        paymentData.status = newStatus;
        axios.put("https://localhost:7298/api/payments/"+paymentId, paymentData)
      await axios.put(`https://localhost:7298/api/payments/${paymentId}`, paymentData);
      fetchPayments();
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const remove = async(paymentId)=>{
    try {
        await axios.delete(`https://localhost:7298/api/payments/${paymentId}`);
        fetchPayments();
      } catch (error) {
        console.error('Error updating payment status:', error);
      }
  }

  return (
    <div>
      <h1>Platności</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Kupujący</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.status}</td>
              <td>{payment.buyerEmail}</td>
              <td>
                <button onClick={() => updatePaymentStatus(payment.id, 'CONFIRMED')}>Potwierdz</button>
                <button onClick={() => updatePaymentStatus(payment.id, 'REJECTED')}>Odrzuć</button>
                <button onClick={() => remove(payment.id)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsPage;
