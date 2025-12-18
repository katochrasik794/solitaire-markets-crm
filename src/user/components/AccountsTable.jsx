import { Link } from 'react-router-dom';

const AccountsTable = ({
    accounts,
    loading,
    accountBalances,
    onSync,
    syncingAccount,
    title
}) => {

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="flex items-center justify-center">
                    <svg className="animate-spin h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </div>
        );
    }

    if (accounts.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-600" style={{ fontFamily: "Roboto, sans-serif", fontSize: "14px" }}>
                    No {title ? title.toLowerCase() : ''} trading accounts found
                </p>
            </div>
        );
    }

    return (
        <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="w-auto border-collapse table-fixed mx-auto">
                        <thead className="bg-[#EAECEE]">
                            <tr>
                                {['Account Details', 'Leverage', 'Equity', 'Balance', 'Margin', 'Credit', 'Platforms', 'Action', 'Options'].map((head) => (
                                    <th
                                        key={head}
                                        className="px-4 py-4 text-center uppercase"
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "12px",
                                            fontWeight: "500",
                                            color: "#4B5156",
                                            width: "11.11%"
                                        }}
                                    >
                                        {head}
                                    </th>
                                ))}
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
                                                            navigator.clipboard.writeText(account.account_number);
                                                        }}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
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
                                                        {account.account_number}
                                                    </span>
                                                    <button className="text-gray-400 hover:text-gray-600 relative">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" />
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
                                    <td className="px-4 py-2 text-center text-gray-800" style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px" }}>
                                        1:{(() => {
                                            const bal = accountBalances[account.account_number];
                                            return bal?.leverage || account.leverage || 2000;
                                        })()}
                                    </td>
                                    <td className="px-4 py-2 text-center text-gray-800" style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px" }}>
                                        {(() => {
                                            const bal = accountBalances[account.account_number];
                                            return bal?.equity !== undefined ? parseFloat(bal.equity).toFixed(2) : (account.equity ? parseFloat(account.equity).toFixed(2) : '0.00');
                                        })()}
                                    </td>
                                    <td className="px-4 py-2 text-center text-gray-800" style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px" }}>
                                        {(() => {
                                            const bal = accountBalances[account.account_number];
                                            return bal?.balance !== undefined ? parseFloat(bal.balance).toFixed(2) : (account.balance ? parseFloat(account.balance).toFixed(2) : '0.00');
                                        })()}
                                    </td>
                                    <td className="px-4 py-2 text-center text-gray-800" style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px" }}>
                                        {(() => {
                                            const bal = accountBalances[account.account_number];
                                            return bal?.margin !== undefined ? parseFloat(bal.margin).toFixed(2) : (account.margin ? parseFloat(account.margin).toFixed(2) : '0.00');
                                        })()}
                                    </td>
                                    <td className="px-4 py-2 text-center text-gray-800" style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px" }}>
                                        {(() => {
                                            const bal = accountBalances[account.account_number];
                                            return bal?.credit !== undefined ? parseFloat(bal.credit).toFixed(2) : (account.credit ? parseFloat(account.credit).toFixed(2) : '0.00');
                                        })()}
                                    </td>
                                    {/* Platforms */}
                                    <td className="px-4 py-2 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
                                                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                                </svg>
                                            </button>
                                            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
                                                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                    {/* Action - Deposit */}
                                    <td className="px-4 py-2 text-center">
                                        <Link
                                            to="/user/deposits"
                                            className="inline-flex items-center gap-1 bg-white hover:bg-gray-50 text-[#00A896] px-3 py-1.5 rounded border border-[#00A896] transition-colors"
                                            style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px" }}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <rect x="5" y="7" width="14" height="10" rx="1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 7v6m0 0l-2.5-2.5m2.5 2.5l2.5-2.5" />
                                            </svg>
                                            <span>Deposit</span>
                                        </Link>
                                    </td>
                                    {/* Options - Sync */}
                                    <td className="px-4 py-2 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => onSync && onSync(account.account_number)}
                                                disabled={syncingAccount === account.account_number}
                                                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                                title="Sync Balance"
                                            >
                                                {syncingAccount === account.account_number ? (
                                                    <svg className="w-4 h-4 text-gray-600 animate-spin" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                )}
                                            </button>
                                            <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        {/* Footer Summary */}
                        <tfoot>
                            <tr><td colSpan="10" className="px-4 py-1 bg-gray-100"></td></tr>
                            <tr className="border-t border-gray-200" style={{ backgroundColor: "#F9FAFB" }}>
                                <td className="px-4 py-2 text-center">
                                    <div className="flex items-center justify-center gap-3.5 flex-nowrap">
                                        <span className="px-2 py-1 bg-[#e5f5ea] text-green-600 rounded text-xs whitespace-nowrap" style={{ fontFamily: "Roboto, sans-serif", fontSize: "12px", fontWeight: "500" }}>USD</span>
                                        <span className="text-gray-800 font-semibold" style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Total</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-center"></td>
                                <td className="px-4 py-2 text-center text-gray-800 font-semibold" style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px", fontWeight: "600", color: "#374151" }}>
                                    {(() => {
                                        const total = accounts.reduce((sum, acc) => {
                                            const bal = accountBalances[acc.account_number];
                                            return sum + (bal?.equity || parseFloat(acc.equity || 0));
                                        }, 0);
                                        return total.toFixed(2);
                                    })()}
                                </td>
                                <td className="px-4 py-2 text-center text-gray-800 font-semibold" style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px", fontWeight: "600", color: "#374151" }}>
                                    {(() => {
                                        const total = accounts.reduce((sum, acc) => {
                                            const bal = accountBalances[acc.account_number];
                                            return sum + (bal?.balance || parseFloat(acc.balance || 0));
                                        }, 0);
                                        return total.toFixed(2);
                                    })()}
                                </td>
                                <td className="px-4 py-2 text-center text-gray-800 font-semibold" style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px", fontWeight: "600", color: "#374151" }}>
                                    {(() => {
                                        const total = accounts.reduce((sum, acc) => {
                                            const bal = accountBalances[acc.account_number];
                                            return sum + (bal?.margin || parseFloat(acc.margin || 0));
                                        }, 0);
                                        return total.toFixed(2);
                                    })()}
                                </td>
                                <td className="px-4 py-2 text-center text-gray-800 font-semibold" style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px", fontWeight: "600", color: "#374151" }}>
                                    {(() => {
                                        const total = accounts.reduce((sum, acc) => {
                                            const bal = accountBalances[acc.account_number];
                                            return sum + (bal?.credit || parseFloat(acc.credit || 0));
                                        }, 0);
                                        return total.toFixed(2);
                                    })()}
                                </td>
                                <td className="px-4 py-2 text-center"></td>
                                <td className="px-4 py-2 text-center"></td>
                                <td className="px-4 py-2 text-center"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
                {accounts.map((account) => (
                    <div key={account.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-green-500 text-white rounded text-xs whitespace-nowrap">{account.currency || 'USD'}</span>
                                <span className="text-gray-800 font-semibold text-sm">{account.account_number}</span>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </button>
                        </div>
                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div><p className="text-gray-500 text-xs">Platform</p><p className="text-gray-800 font-semibold text-sm">{account.platform}</p></div>
                            <div>
                                <p className="text-gray-500 text-xs">Leverage</p>
                                <p className="text-gray-800 font-semibold text-sm">1:{(() => {
                                    const bal = accountBalances[account.account_number];
                                    return bal?.leverage || account.leverage || 2000;
                                })()}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs">Equity</p>
                                <p className="text-gray-800 font-semibold text-sm">{(() => {
                                    const bal = accountBalances[account.account_number];
                                    return bal?.equity !== undefined ? parseFloat(bal.equity).toFixed(2) : '0.00';
                                })()}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs">Balance</p>
                                <p className="text-gray-800 font-semibold text-sm">{(() => {
                                    const bal = accountBalances[account.account_number];
                                    return bal?.balance !== undefined ? parseFloat(bal.balance).toFixed(2) : '0.00';
                                })()}</p>
                            </div>
                        </div>
                        {/* Mobile Actions */}
                        <div className="flex gap-2">
                            <Link to="/user/deposits" className="flex-1 bg-brand-500 hover:bg-brand-600 text-dark-base px-4 py-2 rounded text-center text-sm font-medium transition-colors">Deposit</Link>
                            <button
                                onClick={() => onSync && onSync(account.account_number)}
                                disabled={syncingAccount === account.account_number}
                                className="flex items-center justify-center bg-gray-100 hover:bg-gray-200" style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%' }}
                            >
                                {syncingAccount === account.account_number ? (
                                    <svg className="w-4 h-4 text-gray-600 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                ) : (
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AccountsTable;
