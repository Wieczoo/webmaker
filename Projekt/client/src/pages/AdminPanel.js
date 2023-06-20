import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AdminPages   from "../components/pages/AdminPage";
import PaymentsPage from "../components/pages/PaymentsPage";
const AdminPanel = () =>{
    
  
    return(
        <>
            <header>Panel Administratora</header>
            <AdminPages></AdminPages>
            <PaymentsPage></PaymentsPage>
        </>
    );
}

export default AdminPanel;