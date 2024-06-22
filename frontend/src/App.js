import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Founders from './components/Founders/Founders';
import Startup from './components/Startup/Startup';
import StartupDetail from './components/Startup/StartupDetail';
import StartupLegal from './components/StartupLegal/StartupLegal';
import MisDocs from './components/MisDocs/MisDocs';
import Tickets from './components/Tickets/Tickets';
import TicketDetail from './components/Tickets/TicketDetail'; // Corrected import
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';
import FormDetails from './components/Form/FormDetails';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/" element={<DefaultLayout />}>
          <Route path="founders" element={<Founders />} />
          <Route path="startup-general" element={<Startup />} />
          <Route path="startup-general/:id" element={<StartupDetail />} />
          <Route path="startup-legal" element={<StartupLegal />} />
          <Route path="mis-docs" element={<MisDocs />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="tickets/:id" element={<TicketDetail />} /> {/* Fixed route */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="form" element={<Form />} />
          <Route path="form/:title" element={<FormDetails />} />
          {/* <Route path="/form/:id" component={FormDetails} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function DefaultLayout() {
  return (
    <div className="app">
      <div className="container">
        <main className="content">
          <Routes> 
            <Route path="founders" element={<Founders />} />
            <Route path="startup-general" element={<Startup />} />
            <Route path="startup-general/:id" element={<StartupDetail />} />
            <Route path="startup-legal" element={<StartupLegal />} />
            <Route path="mis-docs" element={<MisDocs />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="tickets/:id" element={<TicketDetail />} /> {/* Fixed route */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="form" element={<Form />} />
            <Route path="form/:title" element={<FormDetails />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;






///////////bef drag form 
// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Signup from './components/Signup/Signup';
// import Founders from './components/Founders/Founders';
// import Startup from './components/Startup/Startup';
// import StartupDetail from './components/Startup/StartupDetail';
// import StartupLegal from './components/StartupLegal/StartupLegal';
// import MisDocs from './components/MisDocs/MisDocs';
// import Tickets from './components/Tickets/Tickets';
// import TicketDetail from './components/Tickets/TicketDetail';
// import Dashboard from './components/Dashboard/Dashboard';
// import Form from './components/Form/Form'; 
// import './App.css';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/" element={<Navigate to="/signup" replace />} />
//         <Route path="/" element={<DefaultLayout />}>
//           <Route path="founders" element={<Founders />} /> 
//           <Route path="startup-general" element={<Startup />} />
//           <Route path="startup-general/:id" element={<StartupDetail />} />
//           <Route path="startup-legal" element={<StartupLegal />} />
//           <Route path="mis-docs" element={<MisDocs />} />
//           <Route path="tickets" element={<Tickets />} />
//           <Route path="tickets/:id" element={<TicketDetail />} />
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="form" element={<Form />} /> 
//           <Route path="startupdetaila" element={<StartupDetail />} /> 
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// function DefaultLayout() {
//   return (
//     <div className="app">
//       <div className="container">
//         <main className="content">
//           <Routes>
//             <Route path="founders" element={<Founders />} />
//             <Route path="startup-general" element={<Startup />} />
//             <Route path="startup-general/:id" element={<StartupDetail />} />
//             <Route path="startup-legal" element={<StartupLegal />} />
//             <Route path="mis-docs" element={<MisDocs />} />
//             <Route path="tickets" element={<Tickets />} />
//             <Route path="tickets/:id" element={<TicketDetail />} />
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="form" element={<Form />} /> 
//           <Route path="startupdetaila" element={<StartupDetail />} /> 
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;
