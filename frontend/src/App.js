import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/dashboard/home";
import Layout from "./pages/dashboard/layout";
import Login from "./pages/login/login";
import Register from "./pages/login/register";
import Shop from "./pages/dashboard/shop";
import Pages from "./pages/dashboard/pages";
import Apperance from "./pages/dashboard/apperance";
import Settings from "./pages/dashboard/settings";
import Profile from "./pages/dashboard/profile";
import UserHome from "./pages/home/login";
import ClearPage from "./pages/dashboard/clearPage";
import './styles/main.css';

function App() {
  return (
    <>
    <div id="wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="home" element={<UserHome/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="dashboard" element={<Layout/>}>
            <Route path="home" element ={<Home/>}/>
            <Route path="shop" element ={<Shop/>}/>
            <Route path="pages" element ={<Pages/>}/>
            <Route path="apperance" element ={<Apperance/>}/>
            <Route path="settings" element ={<Settings/>}/>
            <Route path="profile" element ={<Profile/>}/>
          
          </Route>
          <Route path="clearPage" element ={<ClearPage/>}/>
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