import {BrowserRouter , Routes , Route} from 'react-router-dom'

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import './stylesheets/alignments.css'
import './stylesheets/sizes.css'
import './stylesheets/form-elements.css'
import './stylesheets/theme.css'
import './stylesheets/custom.css'



function App() {
  return (
    <div >
       <BrowserRouter>
       
       <Routes>
        
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
