import Home from './components/Home';
import AddForm from './components/Addform';
import Mainhome from './components/Mainhome';

import { BrowserRouter as Router, Route, Routes} from "react-router-dom"; // Import 'Router'

function App() {
  return (
    
     <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Mainhome />} />
        
        <Route path="/addform" element={<AddForm />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
    
  );
}


export default App;
