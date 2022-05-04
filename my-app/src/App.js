import './App.css';
import Xarrow from "react-xarrows";
import Dashboard from './dashboard/Dashboard.tsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Title from "./dashboard/Title"
function App() {
  function addNode(){
    
  }
  return (
    //<button onClick={addNode}>add node</button>
    
    <BrowserRouter>
    <Dashboard></Dashboard>
    <Routes>
    <Route path = '/linkedlist' component={Dashboard}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
