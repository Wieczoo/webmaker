import { useState,useEffect } from "react";
import axios from "axios";
import '../styles/shop.css'

const ShopPage = () =>{
  const [premium,setPremium] = useState(0)
  
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

    useEffect(()=>{
      axios.get('https://localhost:7298/api/Users/'+ localStorage.getItem('email')).then(response => {
        setPremium(response.data.premium)
      })
    },[])

    return(
        <>
            <header>Premium</header>
            <section>
                {
                  !premium ? <div className="templates">
                  <div onClick={()=>{paymentHandler()}}>Kup premium</div>
                  </div> : <div className="templates">
                  <div>Masz premium</div>
                  </div> 
                }
                
            </section>
        </>
    );
}

export default ShopPage;