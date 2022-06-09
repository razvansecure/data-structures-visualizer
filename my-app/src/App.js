import Dashboard  from './dashboard/Dashboard.tsx'
import dashboardRoute from './dashboard/Dashboard.tsx'
import Queue from './dashboard/Queue.tsx'
import LinkedListStack from './dashboard/LinkedListStack.tsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path = '/' element={<Dashboard />} ></Route>
    <Route path = '/linkedlist' element={<Dashboard />} ></Route>
    <Route path = '/queue' element={<Queue />}></Route>
    <Route path = '/stack' element={<LinkedListStack />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
