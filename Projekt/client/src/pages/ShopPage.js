import { useState } from "react";
import axios from "axios";
import '../styles/shop.css'

const ShopPage = () =>{
  const [hash,setHash] = useState('')
  const url = 'https://api.sandbox.paynow.pl/v1/payments';
  const apiKey = 'f8a4e485-591c-4764-ba41-bd125e6ae4b1';
  const signature = 'IExnDYF3U/A6y0UKm6VnuOMz0+uXsxMcZRg8h4QgZAE=';
  const idempotencyKey = '59c6dd26-f905-487b-96c9-fd1d2bd76885';
  const requestData = {
    amount: 997,
    reason: 'RMA'
  };
  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

  function createExternalId() {
    const currentDate = new Date(); 
    const timestamp = currentDate. getTime(); 
    return timestamp
  }
    const paymentHandler = () => {
        const externalId = createExternalId()
        localStorage.setItem('lastExternalId',externalId)
        axios.post("https://localhost:7298/api/hash",{
            "amount": "12345",
            "externalId": externalId,
            "description": "Payment description",
            "buyer": {
                "email": localStorage.getItem('email')
            }
        }
        ).then(response => {
            const url = response.data.redirectUrl
            const data = {
              "id": response.data.paymentId,
             "status": response.data.status,
             "elementId": '1',
           "buyerEmail": localStorage.getItem('email')
           }
           localStorage.setItem('paymentData',JSON.stringify(data))
            axios.post('https://localhost:7298/api/payments',data).then(response => {
            window.location.href = url;
          })
          
    })}

    return(
        <>
            <header>Shop</header>
            <section>
                <h3>My templates</h3>
                <div className="templates">
                    <div className="template"></div>
                </div>
                <h3>Free templates</h3>
                <div className="templates">
                    <div className="template"></div>
                </div>
                <h3>Paid templates</h3>
                <div className="templates">
                <div onClick={()=>{paymentHandler()}}>Buy</div>
                </div>
            </section>
        </>
    );
}

export default ShopPage;