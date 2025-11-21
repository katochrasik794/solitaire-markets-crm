import { Link } from 'react-router-dom'

function Deposits() {
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 overflow-x-hidden">
      <div className="max-w-2xl w-full">
        {/* Page Title */}
        <h1 className="mb-6" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px', color: '#000000', fontWeight: '400' }}>
          Deposit types
        </h1>

        {/* Recommended methods */}
        <div className="mb-8">
          <h2 className="mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '400' }}>
            Recommended methods
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Debit/Credit Cards */}
            <Link to="/user/deposits/debit-card" className="bg-gray-200 rounded-lg p-2.5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="mb-0.5" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', color: '#000000', fontWeight: '400' }}>
                    Debit/Credit Cards
                  </h3>
                  <p className="text-gray-600 mb-0.5" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>
                    Fee: 0% Time: Instant
                  </p>
                  <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>
                    Currencies: USD, EUR, GBP & more
                  </p>
                </div>
              </div>
              <svg className="w-4 h-4 text-black ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Apple Pay */}
            <Link to="/user/deposits/apple-pay" className="bg-gray-200 rounded-lg p-2.5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.46-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#000000', fontWeight: '400' }}>
                    Apple Pay
                  </h3>
                  <p className="text-gray-600 mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                    Fee: 0% Time: Instant
                  </p>
                  <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                    Currencies: USD, EUR, AED & more
                  </p>
                </div>
              </div>
              <svg className="w-4 h-4 text-black ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Google Pay */}
            <Link to="/user/deposits/google-pay" className="bg-gray-200 rounded-lg p-2.5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#000000', fontWeight: '400' }}>
                    Google Pay
                  </h3>
                  <p className="text-gray-600 mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                    Fee: 0% Time: Instant
                  </p>
                  <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                    Currencies: USD, EUR, GBP & more
                  </p>
                </div>
              </div>
              <svg className="w-4 h-4 text-black ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Additional Payment Methods */}
        <div className="mb-8">
          <h2 className="mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '400' }}>
            Additional Payment Methods
          </h2>
          <p className="text-gray-600 mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
            Explore More Ways to Deposit Funds.
          </p>
          <Link to="/user/deposits" className="bg-gray-200 rounded-lg p-2.5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between">
            <div className="flex items-center flex-1">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', color: '#000000', fontWeight: '400' }}>
                See all other methods
              </h3>
            </div>
            <svg className="w-4 h-4 text-black ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Cryptocurrencies */}
        <div className="mb-8">
          <h2 className="mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '400' }}>
            Cryptocurrencies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* USDT:TRC20 */}
            <Link to="/user/deposits/usdt-trc20" className="bg-gray-200 rounded-lg p-2.5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <img src="/tether.svg" alt="Tether" className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#000000', fontWeight: '400' }}>
                    USDT:TRC20
                  </h3>
                  <p className="text-gray-600 mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                    Fee: 0% Time: Instant
                  </p>
                  <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                    Currencies: USD, GBP, EUR & more
                  </p>
                </div>
              </div>
              <svg className="w-4 h-4 text-black ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Bitcoin */}
            <Link to="/user/deposits/bitcoin" className="bg-gray-200 rounded-lg p-2.5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <img src="/bitcoin-logo.webp" alt="Bitcoin" className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#000000', fontWeight: '400' }}>
                    Bitcoin
                  </h3>
                  <p className="text-gray-600 mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                    Fee: 0% Time: Instant
                  </p>
                  <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                    Currencies: USD, EUR, GBP & more
                  </p>
                </div>
              </div>
              <svg className="w-4 h-4 text-black ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* USDT:ERC20 */}
            <Link to="/user/deposits/usdt-erc20" className="bg-gray-200 rounded-lg p-2.5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <img src="/tether.svg" alt="Tether" className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#000000', fontWeight: '400' }}>
                    USDT:ERC20
                  </h3>
                  <p className="text-gray-600 mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                    Fee: 0% Time: Instant
                  </p>
                  <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                    Currencies: USD, EUR, GBP & more
                  </p>
                </div>
              </div>
              <svg className="w-4 h-4 text-black ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* USDT:BEP20 */}
            <Link to="/user/deposits/usdt-bep20" className="bg-gray-200 rounded-lg p-2.5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <img src="/tether.svg" alt="Tether" className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#000000', fontWeight: '400' }}>
                    USDT:BEP20
                  </h3>
                  <p className="text-gray-600 mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                    Fee: 0% Time: Instant
                  </p>
                  <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                    Currencies: USD, EUR, GBP & more
                  </p>
                </div>
              </div>
              <svg className="w-4 h-4 text-black ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Ethereum */}
            <Link to="/user/deposits/ethereum" className="bg-gray-200 rounded-lg p-2.5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#000000', fontWeight: '400' }}>
                    Ethereum
                  </h3>
                  <p className="text-gray-600 mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                    Fee: 0% Time: Instant
                  </p>
                  <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                    Currencies: USD, EUR, GBP & more
                  </p>
                </div>
              </div>
              <svg className="w-4 h-4 text-black ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Choose another crypto */}
            <Link to="/user/deposits/other-crypto" className="bg-gray-200 rounded-lg p-2.5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="w-10 h-10 bg-[#00A896] rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#000000', fontWeight: '400' }}>
                    Choose another crypto
                  </h3>
                  <p className="text-gray-600 mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                    Fee: 0% Time: Instant
                  </p>
                  <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                    Currencies: USD, EUR, GBP & more
                  </p>
                </div>
              </div>
              <svg className="w-4 h-4 text-black ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

          </div>
        </div>

        {/* Bank transfers */}
        <div className="mb-8">
          <h2 className="mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '400' }}>
            Bank transfers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/user/deposits/bank-transfer" className="bg-gray-200 rounded-lg p-2.5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="w-10 h-10 bg-[#00A896] rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#000000', fontWeight: '400' }}>
                    Bank Transfer
                  </h3>
                  <p className="text-gray-600 mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                    Fee: 0% Time: 1-3 days
                  </p>
                  <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                    Currencies: USD, EUR, GBP & more
                  </p>
                </div>
              </div>
              <svg className="w-4 h-4 text-black ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>
            if you are using a new payment method that was not used before, your deposit might not be applied immediately into your account and might take up to 24 hours to be reviewed and processed. On some occasions we might request a proof that the card or payment account is under your name.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Deposits
