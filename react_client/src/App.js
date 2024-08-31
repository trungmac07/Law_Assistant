//import logo from './logo.svg';
import './App.css';

import RoutesApp  from './routes';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';

function App() {
  return <RoutesApp/>;
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
