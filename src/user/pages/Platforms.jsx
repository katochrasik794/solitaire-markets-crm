function Platforms() {
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="mb-8" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px', color: '#000000', fontWeight: '400' }}>
          Trading Platforms
        </h1>

        {/* Desktop Platform Section */}
        <div className="mb-12">
          <h2 className="mb-8 text-2xl font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '28px', color: '#000000', fontWeight: '700' }}>
            Desktop Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* MetaTrader 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <img src="/mt4.png" alt="MT4" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-center" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px', color: '#000000', fontWeight: '700' }}>
                  MetaTrader 4
                </h3>
                <p className="text-gray-700 mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400', lineHeight: '1.6' }}>
                  MetaTrader 4 is an advanced trading platform that gives you access to the latest market analysis, charts, and financial news.
                </p>
                <ul className="space-y-2 mb-6" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>World's most popular trading platform.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Enhanced security features.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>30 built-in technical indicators and 31 graphical objects.</span>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400', color: '#000000' }}>
                      Download for MacOS
                    </span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400', color: '#000000' }}>
                      Download for Windows
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* MetaTrader 5 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <img src="/mt5.png" alt="MT5" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-center" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px', color: '#000000', fontWeight: '700' }}>
                  MetaTrader 5
                </h3>
                <p className="text-gray-700 mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400', lineHeight: '1.6' }}>
                  MetaTrader 5 is the advanced version of MetaTrader 4. It is faster and more efficient. MetaTrader 5 allows trading more instruments in almost all financial markets.
                </p>
                <ul className="space-y-2 mb-6" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Twice as many time frames as MT4.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Integrated Economic Calendar.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>38 built-in technical indicators and 44 graphical objects.</span>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400', color: '#000000' }}>
                      Download for MacOS
                    </span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400', color: '#000000' }}>
                      Download for Windows
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Web Platform Section */}
        <div className="mb-12">
          <h2 className="mb-8 text-2xl font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '28px', color: '#000000', fontWeight: '700' }}>
            Web Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* MT4 WebTrader */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                <img src="/mt4.png" alt="MT4 WebTrader" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-center" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px', color: '#000000', fontWeight: '700' }}>
                  MT4 WebTrader
                </h3>
                <p className="text-gray-700 mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400', lineHeight: '1.6' }}>
                  The most popular trading platform which is used by millions of traders worldwide containing everything a trader would ever needs such as chart assets, place orders to managing positions.
                </p>
                <ul className="space-y-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>No installation is needed.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Mirror successful traders in real-time.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>2,000+ products with dynamic leverage.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Robust security and built-in tools.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* MT5 WebTrader */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                <img src="/mt5.png" alt="MT5 WebTrader" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-center" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px', color: '#000000', fontWeight: '700' }}>
                  MT5 WebTrader
                </h3>
                <p className="text-gray-700 mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400', lineHeight: '1.6' }}>
                  The most popular trading platform which is used by millions of traders worldwide containing everything a trader would ever needs such as chart assets, place orders to managing positions.
                </p>
                <ul className="space-y-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Mirror successful traders in real-time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>2,000+ products with dynamic leverage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Robust security and built-in tools</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Solitaire Copy */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 relative">
              <div className="absolute top-4 left-4 z-10">
                <span className="px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '600' }}>
                  New
                </span>
              </div>
              <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                <span className="text-gray-400 text-sm">Solitaire Copy</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-center" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px', color: '#000000', fontWeight: '700' }}>
                  Solitaire Copy
                </h3>
                <p className="text-gray-700 mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400', lineHeight: '1.6' }}>
                  Solitaire Copy is an advanced and fast trading platform that allows you to simplify your trading by copying trades and portfolios from other traders instantly.
                </p>
                <ul className="space-y-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>2000+ products with dynamic leverage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Robust security and built-in tools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Mirror successful traders in real-time</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Platform Section */}
        <div className="mb-12">
          <h2 className="mb-8 text-2xl font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '28px', color: '#000000', fontWeight: '700' }}>
            Mobile Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* MetaTrader 4 Mobile */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-center" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px', color: '#000000', fontWeight: '700' }}>
                  MetaTrader 4
                </h3>
                <div className="h-64 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-32 h-56 bg-white rounded-lg border-4 border-gray-300 shadow-lg flex items-center justify-center">
                    <img src="/mt4.png" alt="MT4" className="w-full h-full object-contain" />
                  </div>
                </div>
                <p className="text-gray-700 mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400', lineHeight: '1.6' }}>
                  With the MetaTrader 4 app, you can manage your account, and trade anytime and anywhere.
                </p>
                <ul className="space-y-2 mb-6" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>All order types and MetaTrader 4 execution modes.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>3 types of charts: Bars, Japanese Candlesticks and a broken line.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>9 time-frames: M1, M5, M15, M30, H1, H4, D1, W1, and MN.</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400', color: '#000000' }}>
                      GET IT ON Google Play
                    </span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                      Download on the App Store
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* MetaTrader 5 Mobile */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-center" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px', color: '#000000', fontWeight: '700' }}>
                  MetaTrader 5
                </h3>
                <div className="h-64 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-32 h-56 bg-white rounded-lg border-4 border-gray-300 shadow-lg flex items-center justify-center">
                    <img src="/mt5.png" alt="MT5" className="w-full h-full object-contain" />
                  </div>
                </div>
                <p className="text-gray-700 mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400', lineHeight: '1.6' }}>
                  The mobile version of MT5 provides everything needed to perform trading operations, send pending orders, as well as to set protective Stop Loss and Take Profit levels.
                </p>
                <ul className="space-y-2 mb-6" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>One Click Trading.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Trade from the price chart or from the Market Depth window.</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400', color: '#000000' }}>
                      GET IT ON Google Play
                    </span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                      Download on the App Store
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Platforms
