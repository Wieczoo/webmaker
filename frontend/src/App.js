import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/dashboard/home";
import Layout from "./pages/dashboard/layout";
import Login from "./pages/login/login";
import Register from "./pages/login/register";
import Shop from "./pages/dashboard/shop";
import Pages from "./pages/dashboard/pages";
import Apperance from "./pages/dashboard/apperance";
import Settings from "./pages/dashboard/settings";
import Page1 from "./pages/dashboard/page1";
import Page2 from "./pages/dashboard/page2";

import './styles/main.css';

function App() {
  return (
    <>
    <div id="wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="page1" element={<Page1/>}/>
          <Route path="page2" element={<Page2/>}/>
          <Route path="dashboard" element={<Layout/>}>
            <Route path="home" element ={<Home/>}/>
            <Route path="shop" element ={<Shop/>}/>
            <Route path="pages" element ={<Pages/>}/>
            <Route path="apperance" element ={<Apperance/>}/>
            <Route path="settings" element ={<Settings/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;


// <Router>
//             <Routes>
//                 <Route path='/' element={<Home />} />
//                 <Route path='about' element={<About />} />
//                 <Route path='posts' element={<Posts />}>
//                     <Route path='new' element={<NewPost />} /> {/*A nested route!*/}
//                     <Route path=':postId' element={<Post />} /> {/*A nested route!*/}
//                 </Route>
//             </Routes>
//         </Router>