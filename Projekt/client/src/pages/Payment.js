import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import React from "react";

const Payment = () =>{
    const location = useLocation();
    const [paymentStatus, setPaymentStatus] = useState("");
    const [paymentId, setPaymentId] = useState("");
  
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const paymentStatusParam = searchParams.get("paymentStatus");
      const paymentIdParam = searchParams.get("paymentId");
  
      setPaymentStatus(paymentStatusParam || "");
      setPaymentId(paymentIdParam || "");
  
      if (paymentStatusParam && paymentIdParam) {
        let paymentData = JSON.parse(localStorage.getItem('paymentData'));
        paymentData.status = paymentStatusParam;
        axios
          .put(window.$url+"/payments/"+paymentIdParam, paymentData)
          .then(response => {
            debugger
            // Obsłuż odpowiedź od serwera
          })
          .catch(error => {
            // Obsłuż błąd żądania
          });
      }
    }, []);
  
    return(
        <>
            <header>Płatność</header>
            
        </>
    );
}

export default Payment;