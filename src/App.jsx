import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import UserLayout from './user/components/UserLayout'

// Admin imports
import { AuthProvider } from './admin/contexts/AuthContext'
import Shell from './admin/layouts/Shell'
import ProtectedRoute from './admin/components/ProtectedRoute'
import FeatureGuard from './admin/components/FeatureGuard'
import AdminIndexRedirect from './admin/components/AdminIndexRedirect'
import adminRoutes from './admin/routes/adminRoutes'
import AdminLogin from './admin/pages/Login'

// Auth Pages
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import NotFound from './pages/NotFound'
import UserProtectedRoute from './components/ProtectedRoute'

// User Pages
import Dashboard from './user/pages/Dashboard'
import Deposits from './user/pages/Deposits'
import DepositRequest from './user/pages/DepositRequest'
import Verification from './user/pages/Verification'
import CreateAccount from './user/pages/CreateAccount'
import DebitCard from './user/pages/withdrawals/DebitCard'
import Skrill from './user/pages/withdrawals/Skrill'
import Neteller from './user/pages/withdrawals/Neteller'
import Crypto from './user/pages/withdrawals/Crypto'
import Transfers from './user/pages/Transfers'
import Reports from './user/pages/Reports'
import SignalCentre from './user/pages/analysis/SignalCentre'
import AssetsOverview from './user/pages/analysis/AssetsOverview'
import MarketNews from './user/pages/analysis/MarketNews'
import MarketCalendar from './user/pages/analysis/MarketCalendar'
import ResearchTerminal from './user/pages/analysis/ResearchTerminal'
import Platforms from './user/pages/Platforms'
import ReferAFriend from './user/pages/ReferAFriend'
import Legal from './user/pages/Legal'

// Deposit Pages
import GooglePay from './user/pages/deposits/GooglePay'
import ApplePay from './user/pages/deposits/ApplePay'
import DebitCardDeposit from './user/pages/deposits/DebitCard'
import USDTTRC20 from './user/pages/deposits/USDTTRC20'
import Bitcoin from './user/pages/deposits/Bitcoin'
import USDTERC20 from './user/pages/deposits/USDTERC20'
import USDTBEP20 from './user/pages/deposits/USDTBEP20'
import Ethereum from './user/pages/deposits/Ethereum'
import BankTransfer from './user/pages/deposits/BankTransfer'
import OtherCrypto from './user/pages/deposits/OtherCrypto'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Admin Login Route */}
        <Route path="/admin/login" element={
          <AuthProvider>
            <AdminLogin />
          </AuthProvider>
        } />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/user/dashboard" replace />} />
        
        {/* User Routes - Protected */}
        <Route path="/user" element={
          <UserProtectedRoute>
            <UserLayout />
          </UserProtectedRoute>
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="verification" element={<Verification />} />
          <Route path="create-account" element={<CreateAccount />} />
          <Route path="deposits" element={<Deposits />} />
          <Route path="deposits/:gatewayId" element={<DepositRequest />} />
          <Route path="deposits/google-pay" element={<GooglePay />} />
          <Route path="deposits/apple-pay" element={<ApplePay />} />
          <Route path="deposits/debit-card" element={<DebitCardDeposit />} />
          <Route path="deposits/usdt-trc20" element={<USDTTRC20 />} />
          <Route path="deposits/bitcoin" element={<Bitcoin />} />
          <Route path="deposits/usdt-erc20" element={<USDTERC20 />} />
          <Route path="deposits/usdt-bep20" element={<USDTBEP20 />} />
          <Route path="deposits/ethereum" element={<Ethereum />} />
          <Route path="deposits/bank-transfer" element={<BankTransfer />} />
          <Route path="deposits/other-crypto" element={<OtherCrypto />} />
          <Route path="withdrawals" element={<Navigate to="/user/withdrawals/debit-card" replace />} />
          <Route path="withdrawals/debit-card" element={<DebitCard />} />
          <Route path="withdrawals/skrill" element={<Skrill />} />
          <Route path="withdrawals/neteller" element={<Neteller />} />
          <Route path="withdrawals/crypto" element={<Crypto />} />
          <Route path="transfers" element={<Transfers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="analysis/signal-centre" element={<SignalCentre />} />
          <Route path="analysis/assets-overview" element={<AssetsOverview />} />
          <Route path="analysis/market-news" element={<MarketNews />} />
          <Route path="analysis/market-calendar" element={<MarketCalendar />} />
          <Route path="analysis/research-terminal" element={<ResearchTerminal />} />
          <Route path="platforms" element={<Platforms />} />
          <Route path="refer-a-friend" element={<ReferAFriend />} />
          <Route path="legal" element={<Legal />} />
        </Route>

        {/* Admin Routes - Protected */}
        <Route 
          path="/admin" 
          element={
            <AuthProvider>
              <ProtectedRoute>
                <Shell />
              </ProtectedRoute>
            </AuthProvider>
          }
        >
          {adminRoutes.map((r) => {
            const fullFeature = (r.path || '').trim();
            return (
              <Route
                key={`ad-${r.path}`}
                path={r.path}
                element={<FeatureGuard feature={fullFeature}>{r.element}</FeatureGuard>}
              />
            );
          })}
          <Route index element={<AdminIndexRedirect />} />
        </Route>

        {/* 404 - Catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App

