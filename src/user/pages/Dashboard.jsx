import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { RiLoginBoxLine } from "react-icons/ri";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { LuWallet } from "react-icons/lu";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { RiArrowDownCircleLine, RiArrowUpCircleLine } from "react-icons/ri";
import authService from "../../services/auth.js";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Dashboard() {
  const navigate = useNavigate();
  const [showReferBanner, setShowReferBanner] = useState(true);
  const [showCopyTradingBanner, setShowCopyTradingBanner] = useState(true);
  const [showKycBanner, setShowKycBanner] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [activityList, setActivityList] = useState([]);
  const [activityTotal, setActivityTotal] = useState(0);
  const [activityPage, setActivityPage] = useState(1);
  const [wallet, setWallet] = useState(null);
  const [loadingWallet, setLoadingWallet] = useState(true);
  
  // Wallet modal state
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [walletModalStep, setWalletModalStep] = useState(1); // 1: Details, 2: Confirmation, 3: Confirmed
  const [walletModalAction, setWalletModalAction] = useState(null); // 'deposit', 'withdraw', 'transfer'
  const [walletFormData, setWalletFormData] = useState({
    amount: '',
    mt5Account: '',
    direction: 'to-mt5' // 'to-mt5' or 'from-mt5'
  });
  const [walletSubmitting, setWalletSubmitting] = useState(false);

  // Fetch accounts from API
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = authService.getToken();
        if (!token) return;

        const response = await fetch(`${API_BASE_URL}/accounts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (data.success) {
          const all = Array.isArray(data.data) ? data.data : [];
          // Only show real/live MT5 accounts (no demo)
          const live = all.filter((acc) => {
            const platform = (acc.platform || '').toUpperCase();
            const status = (acc.account_status || '').toLowerCase();
            const isDemo = !!acc.is_demo;
            return platform === 'MT5' && !isDemo && (status === '' || status === 'active');
          });
          setAccounts(live);
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoadingAccounts(false);
      }
    };

    fetchAccounts();
  }, []);

  // Fetch wallet from API
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        setLoadingWallet(true);
        const token = authService.getToken();
        if (!token) return;

        const res = await fetch(`${API_BASE_URL}/wallet`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setWallet(data.data);
        }
      } catch (err) {
        console.error('Error fetching wallet:', err);
      } finally {
        setLoadingWallet(false);
      }
    };

    fetchWallet();
  }, []);

  // Fetch recent account activity (last 5 items)
  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        setLoadingActivities(true);
        const token = authService.getToken();
        if (!token) return;

        const res = await fetch(`${API_BASE_URL}/accounts/activity?limit=5&offset=0`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success && data.data) {
          setRecentActivities(Array.isArray(data.data.items) ? data.data.items : []);
        }
      } catch (err) {
        console.error('Error fetching recent activity:', err);
      } finally {
        setLoadingActivities(false);
      }
    };

    fetchRecentActivity();
  }, []);

  const loadActivityPage = async (page) => {
    try {
      const token = authService.getToken();
      if (!token) return;

      const limit = 10;
      const offset = (page - 1) * limit;

      const res = await fetch(
        `${API_BASE_URL}/accounts/activity?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const data = await res.json();
      if (data.success && data.data) {
        setActivityList(Array.isArray(data.data.items) ? data.data.items : []);
        setActivityTotal(data.data.total || 0);
        setActivityPage(page);
      }
    } catch (err) {
      console.error('Error loading activity page:', err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen overflow-x-hidden">
      <div className="px-4 sm:px-14 pb-4 sm:pb-6 space-y-4 sm:space-y-6 max-w-full">
        {/* Promotional Banners */}
        {showReferBanner && (
          <div className="mt-8 sm:mt-10 relative rounded-lg overflow-hidden p-6 sm:p-8 bg-[#1e3a47]">
            {/* Background Image (update src once you upload coin image) */}
            <img
              src="/mnt/data/b2c2b802-c742-4bb4-9cb4-4728d3ed422c.png"
              alt=""
              className="absolute right-0 top-0 h-full object-contain opacity-30 pointer-events-none"
            />

            {/* Close Button */}
            <button
              onClick={() => setShowReferBanner(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white z-20"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8">
              <div className="flex-1 pr-0 sm:pr-8">
                <h3 className="text-white text-2xl font-normal leading-snug">
                Get up to USD 125 for every friend you refer
              </h3>

                <p className="text-gray-300 mt-2 text-sm sm:text-base">
                  Invite a Like-Minded trader to create a live account and earn
                  up to USD 125 per friend
              </p>
            </div>

            <Link
              to="/user/refer-a-friend"
                className="bg-[#e6c200] hover:bg-[#d4b000] text-gray-900 px-6 py-2 rounded-lg 
        whitespace-nowrap text-sm sm:text-base transition-colors z-10"
            >
              Refer a Friend
            </Link>
            </div>
          </div>
        )}

        {showCopyTradingBanner && (
          <div className="relative rounded-lg overflow-hidden p-6 sm:p-8 bg-[#1e3a47] mt-6">
            {/* Background Image (update src once you upload chain image) */}
            <img
              src="/solitaire-markets-crm/public/copy-trade-banner-secondary.svg"
              alt=""
              className="absolute right-0 top-0 h-full object-contain opacity-30 pointer-events-none"
            />

            {/* Close Button */}
            <button
              onClick={() => setShowCopyTradingBanner(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white z-20"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8">
              <div className="flex-1 pr-0 sm:pr-8">
                <h3 className="text-white text-2xl font-normal leading-snug">
                Copy trades to diversify your portfolio
              </h3>

                <p className="text-gray-300 mt-2 text-sm sm:text-base">
                Follow successful traders to copy their strategies instantly
              </p>
            </div>

            <button
                className="bg-[#e6c200] hover:bg-[#d4b000] text-gray-900 px-6 py-2 rounded-lg 
        whitespace-nowrap text-sm sm:text-base transition-colors z-10"
            >
              Start now
            </button>
            </div>
          </div>
        )}

        {/* Account Summary */}
        <h2 className="text-sm md:text-md font-medium text-gray-800 mb-3">
            Account Summary
          </h2>

        {/* Card */}
        <div
          className="
    bg-white border border-gray-200 rounded-lg w-full 
    p-4 md:p-8 
    flex flex-col md:flex-row 
    items-stretch md:items-center 
    justify-between 
    gap-6 
    space-y-6 md:space-y-0
"
        >
          {/* ITEM WRAPPER (mobile layout fix) */}
          <div className="w-full flex justify-between md:block">
            <div className="flex flex-col items-start">
              <div className="text-gray-700 font-medium text-xs mb-2">
                Total Balance
              </div>
              <div className="text-gray-900 font-bold text-xs">0.00 USD</div>
            </div>

            {/* Icon (mobile on right, desktop stays same) */}
            <div className="flex items-center justify-center bg-gray-100 md:hidden" style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%', overflow: 'hidden' }}>
              <MdOutlineAccountBalanceWallet className="text-gray-600 text-xl" />
            </div>
              </div>

          {/* Desktop icon */}
          <div className="hidden md:flex items-center justify-center bg-gray-100" style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%', overflow: 'hidden' }}>
            <MdOutlineAccountBalanceWallet className="text-gray-600 text-xl" />
            </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-14 bg-gray-200"></div>

          {/* ITEM 2 */}
          <div className="w-full flex justify-between md:block">
            <div className="flex flex-col items-start">
              <div className="text-gray-700 font-medium text-xs mb-2">
                Total Credit
              </div>
              <div className="text-gray-900 font-bold text-xs">0.00 USD</div>
            </div>
            <div className="flex items-center justify-center bg-gray-100 md:hidden" style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%', overflow: 'hidden' }}>
              <LuWallet className="text-gray-600 text-xl" />
            </div>
              </div>
          <div className="hidden md:flex items-center justify-center bg-gray-100" style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%', overflow: 'hidden' }}>
            <LuWallet className="text-gray-600 text-xl md:text-2xl" />
            </div>

          <div className="hidden md:block w-px h-14 bg-gray-200"></div>

          {/* ITEM 3 */}
          <div className="w-full flex justify-between md:block">
            <div className="flex flex-col items-start">
              <div className="text-gray-700 font-medium text-xs mb-2">
                Total Equity
              </div>
              <div className="text-gray-900 font-bold text-xs">0.00 USD</div>
            </div>
            <div className="flex items-center justify-center bg-gray-100 md:hidden" style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%', overflow: 'hidden' }}>
              <MdOutlineAccountBalanceWallet className="text-gray-600 text-xl md:text-2xl" />
            </div>
              </div>
          <div className="hidden md:flex items-center justify-center bg-gray-100" style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%', overflow: 'hidden' }}>
            <MdOutlineAccountBalanceWallet className="text-gray-600 text-xl md:text-2xl" />
            </div>

          <div className="hidden md:block w-px h-14 bg-gray-200"></div>

          {/* ITEM 4 */}
          <div className="w-full flex justify-between md:block">
            <div className="flex flex-col items-start">
              <div className="text-gray-700 font-medium text-xs mb-2">
                Total Deposits
              </div>
              <div className="text-gray-900 font-bold text-xs">0.00 USD</div>
            </div>
            <div className="flex items-center justify-center bg-[#dff8f4] md:hidden" style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%', overflow: 'hidden' }}>
              <RiArrowUpCircleLine className="text-teal-600 text-xl" />
            </div>
              </div>
          <div className="hidden md:flex items-center justify-center bg-[#dff8f4]" style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%', overflow: 'hidden' }}>
            <RiArrowUpCircleLine className="text-teal-600 text-xl md:text-2xl" />
            </div>

          <div className="hidden md:block w-px h-14 bg-gray-200"></div>

          {/* ITEM 5 */}
          <div className="w-full flex justify-between md:block">
            <div className="flex flex-col items-start">
              <div className="text-gray-700 font-medium text-xs mb-2">
                Total Withdrawals
              </div>
              <div className="text-gray-900 font-bold text-xs">0.00 USD</div>
              </div>
            <div className="flex items-center justify-center bg-[#ffecec] md:hidden" style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%', overflow: 'hidden' }}>
              <RiArrowDownCircleLine className="text-red-500 text-xl" />
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center bg-[#ffecec]" style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%', overflow: 'hidden' }}>
            <RiArrowDownCircleLine className="text-red-500 text-xl md:text-2xl" />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="flex items-center justify-between mb-0">
          <h2 className="text-sm md:text-md font-medium text-gray-800">
            Recent Activity
          </h2>

          <button
            className="border border-gray-300 bg-white px-3 py-1 rounded-md text-sm hover:bg-gray-50 transition"
            onClick={() => {
              setActivityModalOpen(true);
              loadActivityPage(1);
            }}
          >
            View More
          </button>
        </div>

        {/* Activity Card */}
        <div className="bg-white border border-gray-200 rounded-lg w-full p-4 md:p-6">
          {loadingActivities ? (
            <div className="flex items-center justify-center text-gray-500 text-sm">
              Loading activity…
            </div>
          ) : recentActivities.length === 0 ? (
            <div className="flex items-center justify-center text-gray-500 text-sm">
              No recent activity
            </div>
          ) : (
            recentActivities.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-1.5 border-b last:border-b-0"
              >
                {/* Left Section */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="text-gray-700 text-xs md:text-sm">
                    {new Date(item.time).toLocaleDateString()}{" "}
                    {new Date(item.time).toLocaleTimeString()}
                  </span>

                  <span className="text-gray-700 text-xs md:text-sm">
                    {item.title}{" "}
                    {item.accountNumber ? `#${item.accountNumber}` : ""}
                  </span>
                </div>

                {/* Right Section */}
                <span className="text-green-500 font-medium text-xs md:text-sm">
                  Success
                </span>
              </div>
            ))
          )}
        </div>

        {/* Live Accounts */}
        <div className="w-full">
          {/* Header - Outside Card */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
            <h2 className="text-gray-700 text-sm md:text-md font-medium">
              Live Accounts
            </h2>
            <Link 
              to="/user/create-account"
              className="flex items-center justify-center gap-2 border border-gray-300 bg-white px-3 py-1 rounded-md hover:bg-gray-50 transition text-sm sm:text-md"
            >
              <AiOutlinePlus /> Create Account
            </Link>
          </div>

          {/* Table Card - Responsive, scrollable on small screens */}
          {loadingAccounts ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          ) : accounts.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600" style={{ fontFamily: "Roboto, sans-serif", fontSize: "14px" }}>
                No trading account
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto w-full">
                <table className="w-auto border-collapse table-fixed mx-auto">
                  <thead className="bg-[#EAECEE]">
                    <tr>
                      <th
                        className="px-4 py-4 text-center uppercase"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#4B5156",
                          width: "11.11%"
                        }}
                      >
                        Account Details
                      </th>
                      <th
                        className="px-4 py-4 text-center uppercase"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#4B5156",
                          width: "11.11%"
                        }}
                      >
                        Leverage
                      </th>
                      <th
                        className="px-4 py-4 text-center uppercase"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#4B5156",
                          width: "11.11%"
                        }}
                      >
                        Equity
                      </th>
                      <th
                        className="px-4 py-4 text-center uppercase"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#4B5156",
                          width: "11.11%"
                        }}
                      >
                        Balance
                      </th>
                      <th
                        className="px-4 py-4 text-center uppercase"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#4B5156",
                          width: "11.11%"
                        }}
                      >
                        Margin
                      </th>
                      <th
                        className="px-4 py-4 text-center uppercase"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#4B5156",
                          width: "11.11%"
                        }}
                      >
                        Credit
                      </th>
                      <th
                        className="px-4 py-4 text-center uppercase"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#4B5156",
                          width: "11.11%"
                        }}
                      >
                        Platforms
                      </th>
                      <th
                        className="px-4 py-4 text-center uppercase"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#4B5156",
                          width: "11.11%"
                        }}
                      >
                        Action
                      </th>
                      <th
                        className="px-4 py-4 text-center uppercase"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#4B5156",
                          width: "11.11%"
                        }}
                      >
                        Options
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map((account) => (
                      <tr key={account.id} className="border-b border-gray-200">
                        <td className="px-4 py-2 text-center">
                          <div className="flex items-center justify-center gap-3.5 flex-nowrap">
                            <span
                              className="px-2 py-1 bg-[#e5f5ea] text-green-600 rounded text-xs whitespace-nowrap"
                              style={{
                                fontFamily: "Roboto, sans-serif",
                                fontSize: "12px",
                                fontWeight: "500",
                              }}
                            >
                              {account.currency || 'USD'}
                            </span>
                            <div className="flex flex-col items-center">
                              <div className="flex items-center gap-1.5 mb-1">
                                <button
                                  className="text-gray-400 hover:text-gray-600"
                                  title="Copy"
                                  onClick={() => {
                                    navigator.clipboard.writeText(account.api_account_number || account.account_number);
                                  }}
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                  </svg>
                                </button>
                                <span
                                  className="text-gray-800"
                                  style={{
                                    fontFamily: "Roboto, sans-serif",
                                    fontSize: "13px",
                                    fontWeight: "400",
                                    color: "#374151",
                                  }}
                                >
                                  {account.api_account_number || account.account_number}
                                </span>
                                <button className="text-gray-400 hover:text-gray-600 relative">
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      strokeWidth="2"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M12 16v-4m0-4h.01"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <small className="text-center">
                                <span
                                  className="font-bold text-gray-800"
                                  style={{
                                    fontFamily: "Roboto, sans-serif",
                                    fontSize: "12px",
                                    fontWeight: "700",
                                  }}
                                >
                                  {account.platform}
                                </span>
                                <span
                                  className="text-gray-600 ml-1 capitalize"
                                  style={{
                                    fontFamily: "Roboto, sans-serif",
                                    fontSize: "12px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {account.account_type}
                                </span>
                              </small>
                            </div>
                          </div>
                        </td>
                        <td
                          className="px-4 py-2 text-center text-gray-800"
                          style={{
                            fontFamily: "Roboto, sans-serif",
                            fontSize: "13px",
                            fontWeight: "400",
                            color: "#374151",
                          }}
                        >
                          1:{account.leverage || 2000}
                        </td>
                        <td
                          className="px-4 py-2 text-center text-gray-800"
                          style={{
                            fontFamily: "Roboto, sans-serif",
                            fontSize: "13px",
                            fontWeight: "400",
                            color: "#374151",
                          }}
                        >
                          0.00
                        </td>
                        <td
                          className="px-4 py-2 text-center text-gray-800"
                          style={{
                            fontFamily: "Roboto, sans-serif",
                            fontSize: "13px",
                            fontWeight: "400",
                            color: "#374151",
                          }}
                        >
                          0.0000
                        </td>
                        <td
                          className="px-4 py-2 text-center text-gray-800"
                          style={{
                            fontFamily: "Roboto, sans-serif",
                            fontSize: "13px",
                            fontWeight: "400",
                            color: "#374151",
                          }}
                        >
                          0.00
                        </td>
                        <td
                          className="px-4 py-2 text-center text-gray-800"
                          style={{
                            fontFamily: "Roboto, sans-serif",
                            fontSize: "13px",
                            fontWeight: "400",
                            color: "#374151",
                          }}
                        >
                          0.00
                        </td>
                        {/* Platforms column */}
                        <td className="px-4 py-2 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* MT5 icon placeholder */}
                            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
                              <svg
                                className="w-5 h-5 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                              </svg>
                            </button>
                            {/* Status / connected icon */}
                            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
                              <svg
                                className="w-5 h-5 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            </button>
                          </div>
                        </td>

                        {/* Action column - Deposit */}
                        <td className="px-4 py-2 text-center">
                          <Link
                            to="/user/deposits"
                            className="inline-flex items-center gap-1 bg-white hover:bg-gray-50 text-[#00A896] px-3 py-1.5 rounded border border-[#00A896] transition-colors"
                            style={{
                              fontFamily: "Roboto, sans-serif",
                              fontSize: "13px",
                              fontWeight: "400",
                            }}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <rect
                                x="5"
                                y="7"
                                width="14"
                                height="10"
                                rx="1.5"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M12 7v6m0 0l-2.5-2.5m2.5 2.5l2.5-2.5"
                              />
                            </svg>
                            <span>Deposit</span>
                          </Link>
                        </td>

                        {/* Options column - extra actions */}
                        <td className="px-4 py-2 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                              </svg>
                            </button>
                            <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="10" className="px-4 py-1 bg-gray-100"></td>
                    </tr>
                    <tr
                      className="border-t border-gray-200"
                      style={{ backgroundColor: "#F9FAFB" }}
                    >
                      <td className="px-4 py-2 text-center">
                        <div className="flex items-center justify-center gap-3.5 flex-nowrap">
                          <span
                            className="px-2 py-1 bg-[#e5f5ea] text-green-600 rounded text-xs whitespace-nowrap"
                            style={{
                              fontFamily: "Roboto, sans-serif",
                              fontSize: "12px",
                              fontWeight: "500",
                            }}
                          >
                            USD
                          </span>
                          <span
                            className="text-gray-800 font-semibold"
                            style={{
                              fontFamily: "Roboto, sans-serif",
                              fontSize: "13px",
                              fontWeight: "600",
                              color: "#374151",
                            }}
                          >
                            Total
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center"></td>
                      <td
                        className="px-4 py-2 text-center text-gray-800 font-semibold"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#374151",
                        }}
                      >
                        0.00
                      </td>
                      <td
                        className="px-4 py-2 text-center text-gray-800 font-semibold"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#374151",
                        }}
                      >
                        0.00
                      </td>
                      <td
                        className="px-4 py-2 text-center text-gray-800 font-semibold"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#374151",
                        }}
                      >
                        0.00
                      </td>
                      <td
                        className="px-4 py-2 text-center text-gray-800 font-semibold"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#374151",
                        }}
                      >
                        0.00
                      </td>
                      <td className="px-4 py-2 text-center"></td>
                      <td className="px-4 py-2 text-center"></td>
                      <td className="px-4 py-2 text-center"></td>
                      <td className="px-4 py-2 text-center"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* Mobile Card View - Visible on mobile and tablet, hidden on desktop */}
          {loadingAccounts ? (
            <div className="lg:hidden bg-white rounded-lg shadow p-8 text-center">
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          ) : accounts.length === 0 ? (
            <div className="lg:hidden bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600" style={{ fontFamily: "Roboto, sans-serif", fontSize: "14px" }}>
                No trading account
              </p>
            </div>
          ) : (
            <div className="lg:hidden space-y-4">
              {accounts.map((account) => (
                <div key={account.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
                  {/* Account Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-500 text-white rounded text-xs whitespace-nowrap">
                        {account.currency || 'USD'}
                      </span>
                      <span className="text-gray-800 font-semibold text-sm">
                        {account.api_account_number || account.account_number}
                      </span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Account Details */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-gray-500 text-xs">Platform</p>
                      <p className="text-gray-800 font-semibold text-sm">
                        {account.platform} {account.account_type ? account.account_type.charAt(0).toUpperCase() + account.account_type.slice(1) : ''}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Leverage</p>
                      <p className="text-gray-800 font-semibold text-sm">1:{account.leverage || 2000}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Equity</p>
                      <p className="text-gray-800 font-semibold text-sm">0.00</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Balance</p>
                      <p className="text-gray-800 font-semibold text-sm">0.0000</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Margin</p>
                      <p className="text-gray-800 font-semibold text-sm">0.00</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Credit</p>
                      <p className="text-gray-800 font-semibold text-sm">0.00</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button className="flex items-center gap-1 px-3 py-2 rounded border border-gray-300 text-gray-600 text-xs hover:bg-gray-50">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                      Platform
                    </button>
                    <button className="flex items-center gap-1 px-3 py-2 rounded border border-gray-300 text-gray-600 text-xs hover:bg-gray-50">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      Verified
                    </button>
                  </div>

                  {/* Primary Actions */}
                  <div className="flex gap-2">
                    <Link
                      to="/user/deposits"
                      className="flex-1 bg-[#e6c200] hover:bg-[#d4b000] text-gray-900 px-4 py-2 rounded text-center text-sm font-medium transition-colors"
                    >
                      Deposit
                    </Link>
                    <button className="flex items-center justify-center bg-gray-100 hover:bg-gray-200" style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%', overflow: 'hidden' }}>
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </button>
                    <button className="flex items-center justify-center bg-gray-100 hover:bg-gray-200" style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%', overflow: 'hidden' }}>
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              {/* Total Summary Card */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-green-500 text-white rounded text-xs whitespace-nowrap">
                    USD
                  </span>
                  <span className="text-gray-800 font-semibold">Total</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Equity: </span>
                    <span className="text-gray-800 font-semibold">0.00</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Balance: </span>
                    <span className="text-gray-800 font-semibold">0.00</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Margin: </span>
                    <span className="text-gray-800 font-semibold">0.00</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Credit: </span>
                    <span className="text-gray-800 font-semibold">0.00</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      {/* Activity Modal */}
      {activityModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3
                className="text-sm md:text-md font-medium text-gray-900"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                All Activity
              </h3>
              <button
                onClick={() => setActivityModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              {activityList.length === 0 ? (
                <div className="text-center text-gray-500 text-sm py-6">
                  No activity found
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-2 text-xs font-semibold text-gray-600">
                        Time
                      </th>
                      <th className="px-3 py-2 text-xs font-semibold text-gray-600">
                        Details
                      </th>
                      <th className="px-3 py-2 text-xs font-semibold text-gray-600 text-right">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityList.map((item) => (
                      <tr key={item.id} className="border-b last:border-b-0">
                        <td className="px-3 py-2 text-xs text-gray-700 whitespace-nowrap">
                          {new Date(item.time).toLocaleDateString()}{" "}
                          {new Date(item.time).toLocaleTimeString()}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-800">
                          {item.title}{" "}
                          {item.accountNumber ? `#${item.accountNumber}` : ""}
                        </td>
                        <td className="px-3 py-2 text-xs text-right">
                          <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">
                            Success
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Modal Footer / Pagination */}
            <div className="px-4 py-3 border-t flex items-center justify-between text-xs">
              <span className="text-gray-500">
                Page {activityPage} of{" "}
                {Math.max(1, Math.ceil(activityTotal / 10) || 1)}
              </span>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 border border-gray-300 rounded disabled:opacity-40"
                  disabled={activityPage <= 1}
                  onClick={() => loadActivityPage(activityPage - 1)}
                >
                  Prev
                </button>
                <button
                  className="px-2 py-1 border border-gray-300 rounded disabled:opacity-40"
                  disabled={activityPage >= Math.ceil(activityTotal / 10)}
                  onClick={() => loadActivityPage(activityPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* ================= DEMO ACCOUNTS ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <h2 className="text-gray-700 text-sm md:text-md font-medium">
            Demo Accounts
          </h2>
          {/* Create Account for wallet is not needed; one wallet per user */}
        </div>

        {/* Demo Card */}
        <div className="bg-white border border-gray-200 rounded-lg w-full py-8 sm:py-12 flex items-center justify-center text-gray-500 text-sm sm:text-base mb-8 sm:mb-12 text-center px-4">
          Practice and master your trading skills.
        </div>

        {/* ================= WALLET ACCOUNTS ================= */}
        <div className="mb-4">
          <h2 className="text-gray-700 text-sm md:text-md font-medium">
            Wallet Accounts
          </h2>
        </div>

        {/* Wallet Card */}
        <div className="bg-white border border-gray-200 rounded-lg w-full p-4 sm:p-6">
          {/* ================= MOBILE LAYOUT ================= */}
          <div className="block sm:hidden">
            {/* Currency + ID */}
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 text-xs font-semibold bg-[#e5f5ea] text-green-700 rounded-md">
                {wallet?.currency || 'USD'}
              </span>
              <span className="text-teal-600 font-semibold text-sm">
                {wallet?.wallet_number || '—'}
              </span>
            </div>

            {/* Balance */}
              <div className="text-gray-600 text-sm mb-3">
                Balance{" "}
                <span className="font-bold text-gray-900">
                  {loadingWallet
                    ? '...'
                    : (wallet?.balance != null
                        ? Number(wallet.balance).toFixed(3)
                        : '0.000')}
                </span>
              </div>

            {/* Buttons (stacked like screenshot) */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setWalletModalAction('deposit');
                  setWalletModalStep(1);
                  setWalletFormData({ amount: '', mt5Account: '', direction: 'to-mt5' });
                  setWalletModalOpen(true);
                }}
                className="
        flex items-center gap-2 
        w-full px-4 py-3 
        text-sm font-medium
        rounded-md border 
        bg-white hover:bg-gray-50 transition
      "
              >
                <RiLoginBoxLine className="text-teal-600 w-5 h-5" />
                <span className="text-gray-900">Deposit</span>
              </button>

              <button
                onClick={() => {
                  setWalletModalAction('transfer');
                  setWalletModalStep(1);
                  setWalletFormData({ amount: '', mt5Account: '', direction: 'to-mt5' });
                  setWalletModalOpen(true);
                }}
                className="
        flex items-center gap-2 
        w-full px-4 py-3 
        text-sm font-medium
        rounded-md border 
        bg-white hover:bg-gray-50 transition
      "
              >
                <RiArrowLeftRightLine className="text-gray-600 w-5 h-5" />
                <span className="text-gray-700">Transfer</span>
              </button>

              <button
                onClick={() => {
                  setWalletModalAction('withdraw');
                  setWalletModalStep(1);
                  setWalletFormData({ amount: '', mt5Account: '', direction: 'to-mt5' });
                  setWalletModalOpen(true);
                }}
                className="
        flex items-center gap-2 
        w-full px-4 py-3 
        text-sm font-medium
        rounded-md border 
        bg-white hover:bg-gray-50 transition
      "
              >
                <RiLogoutBoxLine className="text-gray-600 w-5 h-5" />
                <span className="text-gray-700">Withdraw</span>
              </button>
            </div>
          </div>

          {/* ================= DESKTOP LAYOUT ================= */}
          <div className="hidden sm:flex items-center justify-between gap-6">
            {/* Left: Currency + Wallet ID */}
            <div className="flex items-center gap-3 min-w-max">
              <span className="px-3 py-1 text-xs font-semibold bg-[#e5f5ea] text-green-600 rounded-md">
                {wallet?.currency || 'USD'}
              </span>
              <span className="text-teal-600 font-semibold text-sm md:text-base">
                {wallet?.wallet_number || '—'}
              </span>
            </div>

            {/* Center: Balance */}
            <div className="text-gray-600 text-sm flex-1 text-center">
              Balance{" "}
              <span className="font-bold text-gray-900">
                {loadingWallet
                  ? '...'
                  : (wallet?.balance != null
                      ? Number(wallet.balance).toFixed(3)
                      : '0.000')}
              </span>
            </div>

            {/* Right: Buttons (matches screenshot EXACTLY) */}
            <div className="flex items-center gap-3 min-w-max">
              {/* Deposit (highlighted) */}
              <button
                onClick={() => {
                  setWalletModalAction('deposit');
                  setWalletModalStep(1);
                  setWalletFormData({ amount: '', mt5Account: '', direction: 'to-mt5' });
                  setWalletModalOpen(true);
                }}
                className="
        flex items-center gap-2 
        border rounded-md px-4 py-2 
        text-sm font-medium 
        hover:bg-gray-50 transition
      "
              >
                <RiLoginBoxLine className="text-teal-600" />
                <span className="text-gray-900">Deposit</span>
              </button>

              {/* Transfer */}
              <button
                onClick={() => {
                  setWalletModalAction('transfer');
                  setWalletModalStep(1);
                  setWalletFormData({ amount: '', mt5Account: '', direction: 'to-mt5' });
                  setWalletModalOpen(true);
                }}
                className="
        flex items-center gap-2 
        border rounded-md px-4 py-2 
        text-sm hover:bg-gray-50 transition
      "
              >
                <RiArrowLeftRightLine className="text-gray-600" />
                <span className="text-gray-600">Transfer</span>
              </button>

              {/* Withdraw */}
              <button
                onClick={() => {
                  setWalletModalAction('withdraw');
                  setWalletModalStep(1);
                  setWalletFormData({ amount: '', mt5Account: '', direction: 'to-mt5' });
                  setWalletModalOpen(true);
                }}
                className="
        flex items-center gap-2 
        border rounded-md px-4 py-2 
        text-sm hover:bg-gray-50 transition
      "
              >
                <RiLogoutBoxLine className="text-gray-600" />
                <span className="text-gray-600">Withdraw</span>
              </button>
            </div>
          </div>
        </div>

        {/* Wallet Modal - 3 Step Flow */}
        {walletModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget && walletModalStep === 3) {
                setWalletModalOpen(false);
                setWalletModalStep(1);
                setWalletFormData({ amount: '', mt5Account: '', direction: 'to-mt5' });
                navigate('/user/transfers');
              }
            }}
          >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              {/* Step Indicators */}
              <div className="flex items-center justify-center gap-2 p-4 border-b">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  walletModalStep >= 1 ? 'bg-[#00A896] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <div className={`flex-1 h-0.5 ${
                  walletModalStep >= 2 ? 'bg-[#00A896]' : 'bg-gray-200'
                }`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  walletModalStep >= 2 ? 'bg-[#00A896] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <div className={`flex-1 h-0.5 ${
                  walletModalStep >= 3 ? 'bg-[#00A896]' : 'bg-gray-200'
                }`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  walletModalStep >= 3 ? 'bg-[#00A896] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
              </div>

              {/* Step 1: Details */}
              {walletModalStep === 1 && (
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {walletModalAction === 'deposit' && 'Deposit to Wallet'}
                    {walletModalAction === 'withdraw' && 'Withdraw from Wallet'}
                    {walletModalAction === 'transfer' && 'Internal Transfer'}
                  </h3>

                  {walletModalAction === 'transfer' && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transfer Direction
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="to-mt5"
                            checked={walletFormData.direction === 'to-mt5'}
                            onChange={(e) => setWalletFormData({ ...walletFormData, direction: e.target.value })}
                            className="mr-2"
                          />
                          <span className="text-sm">Wallet → MT5</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="from-mt5"
                            checked={walletFormData.direction === 'from-mt5'}
                            onChange={(e) => setWalletFormData({ ...walletFormData, direction: e.target.value })}
                            className="mr-2"
                          />
                          <span className="text-sm">MT5 → Wallet</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {walletModalAction === 'transfer' && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        MT5 Account
                      </label>
                      <select
                        value={walletFormData.mt5Account}
                        onChange={(e) => setWalletFormData({ ...walletFormData, mt5Account: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                        required
                      >
                        <option value="">Select MT5 Account</option>
                        {accounts.map((acc) => (
                          <option key={acc.id} value={acc.account_number}>
                            {acc.account_number} ({acc.platform} {acc.account_type})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (USD)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={walletFormData.amount}
                      onChange={(e) => setWalletFormData({ ...walletFormData, amount: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setWalletModalOpen(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (walletFormData.amount && (walletModalAction !== 'transfer' || walletFormData.mt5Account)) {
                          setWalletModalStep(2);
                        }
                      }}
                      disabled={!walletFormData.amount || (walletModalAction === 'transfer' && !walletFormData.mt5Account)}
                      className="flex-1 px-4 py-2 bg-[#00A896] text-white rounded-md hover:bg-[#008B7A] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Confirmation */}
              {walletModalStep === 2 && (
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Transaction</h3>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-semibold text-gray-900 capitalize">
                        {walletModalAction === 'deposit' && 'Deposit'}
                        {walletModalAction === 'withdraw' && 'Withdraw'}
                        {walletModalAction === 'transfer' && `Transfer ${walletFormData.direction === 'to-mt5' ? 'Wallet → MT5' : 'MT5 → Wallet'}`}
                      </span>
                    </div>
                    {walletModalAction === 'transfer' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">MT5 Account:</span>
                        <span className="font-semibold text-gray-900">{walletFormData.mt5Account}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-semibold text-gray-900">${Number(walletFormData.amount).toFixed(2)}</span>
                    </div>
                    {wallet && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Balance:</span>
                        <span className="font-semibold text-gray-900">${Number(wallet.balance).toFixed(3)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setWalletModalStep(1)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={async () => {
                        setWalletSubmitting(true);
                        try {
                          const token = authService.getToken();
                          let response;
                          
                          if (walletModalAction === 'deposit') {
                            response = await fetch(`${API_BASE_URL}/wallet/deposit`, {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                              },
                              body: JSON.stringify({ amount: parseFloat(walletFormData.amount) })
                            });
                          } else if (walletModalAction === 'withdraw') {
                            response = await fetch(`${API_BASE_URL}/wallet/withdraw`, {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                              },
                              body: JSON.stringify({ amount: parseFloat(walletFormData.amount) })
                            });
                          } else if (walletModalAction === 'transfer') {
                            const endpoint = walletFormData.direction === 'to-mt5' 
                              ? '/wallet/transfer-to-mt5'
                              : '/wallet/transfer-from-mt5';
                            response = await fetch(`${API_BASE_URL}${endpoint}`, {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                              },
                              body: JSON.stringify({
                                mt5Account: walletFormData.mt5Account,
                                amount: parseFloat(walletFormData.amount)
                              })
                            });
                          }

                          const data = await response.json();
                          if (data.success) {
                            setWalletModalStep(3);
                            // Refresh wallet balance
                            const walletRes = await fetch(`${API_BASE_URL}/wallet`, {
                              headers: { 'Authorization': `Bearer ${token}` }
                            });
                            const walletData = await walletRes.json();
                            if (walletData.success) setWallet(walletData.data);
                          } else {
                            alert(data.message || 'Transaction failed');
                            setWalletSubmitting(false);
                          }
                        } catch (error) {
                          console.error('Transaction error:', error);
                          alert('Transaction failed. Please try again.');
                          setWalletSubmitting(false);
                        }
                      }}
                      disabled={walletSubmitting}
                      className="flex-1 px-4 py-2 bg-[#00A896] text-white rounded-md hover:bg-[#008B7A] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {walletSubmitting ? 'Processing...' : 'Confirm'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmed */}
              {walletModalStep === 3 && (
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Transaction Confirmed</h3>
                  <p className="text-gray-600 mb-6">
                    Your {walletModalAction} of ${Number(walletFormData.amount).toFixed(2)} has been processed successfully.
                  </p>
                  <button
                    onClick={() => {
                      setWalletModalOpen(false);
                      setWalletModalStep(1);
                      setWalletFormData({ amount: '', mt5Account: '', direction: 'to-mt5' });
                      navigate('/user/transfers');
                    }}
                    className="w-full px-4 py-2 bg-[#00A896] text-white rounded-md hover:bg-[#008B7A] transition"
                  >
                    View Transfers
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
