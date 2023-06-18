import { useState } from "react";

import '../styles/shop.css'

const ShopPage = () =>{
  
    
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
                    <div className="template"></div>
                </div>
            </section>
        </>
    );
}

export default ShopPage;