
import { CareRecipientProvider } from './hooks/careRecipients/careRecipientsContext';
import GlobalStyle from './globalStyles';
import { Routes, Route } from 'react-router-dom';
import CareRecordsPage from './components/Pages/CareRecordsPage';
import LandingPage from './components/Pages/LandingPage';
import VisitPage from './components/Pages/VisitPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <CareRecipientProvider>
      <GlobalStyle />
      <NavBar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/care-report/:care_recipient_name" element={<CareRecordsPage />} />
        <Route path="/visits/:visit_id" element={<VisitPage />} />
      </Routes>
    </CareRecipientProvider>
  );
}

export default App;
