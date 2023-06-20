// import libraries
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 

// import styles
import './styles/main.css';

// import pages
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import PagesPage from "./pages/PagesPage";
import ApperancePage from "./pages/ApperancePage";
import ProfilePage from "./pages/ProfilePage";
import Payment from "./pages/Payment";
import AdminPanel from './pages/AdminPanel';
import PagePreview from "./pages/PreviewPage";


import PageEditor from "./pages/PageEditorBeta";

const App = () =>{
    return(
        <>
            <main>
                <Router>
                    <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="preview" element={<PagePreview/>}/>
                        <Route path="register" element={<RegisterPage/>}/>
                        <Route path="dashboard" element={<Layout/>}>
                            <Route path="home" element ={<HomePage/>}/>
                            <Route path="shop" element ={<ShopPage/>}/>
                            <Route path="pages" element ={<PagesPage/>}/>
                            <Route path="editor" element ={<ApperancePage/>}/>
                            <Route path="profile" element ={<ProfilePage/>}/>
                            <Route path="payment" element ={<Payment/>}/>
                            <Route path="beta" element ={<PageEditor/>}/>
                            <Route path="admin" element ={<AdminPanel/>}/>
                        </Route>
                    </Routes>
                </Router>
            </main>
        </>
    );

}

export default App;