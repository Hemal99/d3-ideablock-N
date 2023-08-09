// Libraries
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from 'react-redux'
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

// Fonts
import './fonts/DellReplica-Regular.otf';

// CSS
import './App.css';

// Pages
import Form from './pages/form.js';

import params from './params';
import store from './logic/reducer';
import IdealBox from './pages/idealBox';

const engine = new Styletron();

function App() {
  return (
    <Provider store={store}>
      <StyletronProvider value={engine}>
        <BrowserRouter>
          <Routes>
            {/* <Route exact path='/' element={<Form  pageParams={params} />}/> */}
            <Route exact path='/' element={<IdealBox  />}/>
          </Routes>
        </BrowserRouter>
      </StyletronProvider>
    </Provider>
  );
}

export default App;

