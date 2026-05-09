import { AppProvider, useApp } from './contexts/AppContext.jsx';
import AppLayout from './components/layout/AppLayout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MyLeaves from './pages/MyLeaves.jsx';
import NewRequest from './pages/NewRequest.jsx';
import Approvals from './pages/Approvals.jsx';
import Team from './pages/Team.jsx';
import CalendarPage from './pages/Calendar.jsx';

function Router() {
  const { isAuthed, route, user } = useApp();
  if (!isAuthed) return <Login />;

  const isManager = user.role === 'manager';
  let page;
  switch (route) {
    case 'my-leaves': page = <MyLeaves />; break;
    case 'new':       page = <NewRequest />; break;
    case 'calendar':  page = <CalendarPage />; break;
    case 'approvals': page = isManager ? <Approvals /> : <Dashboard />; break;
    case 'team':      page = isManager ? <Team />      : <Dashboard />; break;
    case 'dashboard':
    default:          page = <Dashboard />;
  }
  return <AppLayout>{page}</AppLayout>;
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}
