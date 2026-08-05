import { Navigate, Route, Routes } from 'react-router-dom';
import TabLayout from '../components/TabLayout';
import HomePage from '../pages/HomePage';
import MembersPage from '../pages/MembersPage';
import MemberDetailPage from '../pages/MemberDetailPage';
import EntryPage from '../pages/EntryPage';
import ReportPage from '../pages/ReportPage';
import TotalPage from '../pages/TotalPage';
import ModalPage from '../pages/ModalPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<TabLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/members/:id" element={<MemberDetailPage />} />
        <Route path="/entry" element={<EntryPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/modal" element={<ModalPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
