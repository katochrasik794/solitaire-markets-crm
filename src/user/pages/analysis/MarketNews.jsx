import { useState } from 'react'

function MarketNews() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)
  const [currentAnalysisIndex, setCurrentAnalysisIndex] = useState(0)

  const marketNews = [
    {
      id: 1,
      ticker: 'AVGO',
      name: 'Broadcom',
      movement: 'MOVING DOWN',
      change: '-2.47%',
      changeColor: 'red',
      logo: 'AVGO',
      description: 'Broadcom resumes Outperform rating at $420 target. High trading volume amid broader semiconductor sector decline.',
      type: 'performance',
      vsSector: 'BOTTOM 9%',
      vsSectorColor: 'red',
      vsSP500: 'BOTTOM 3%',
      vsSP500Color: 'red'
    },
    {
      id: 2,
      ticker: 'TSLA',
      name: 'Tesla',
      movement: 'MOVING DOWN',
      change: '-0.9%',
      changeColor: 'red',
      logo: 'TSLA',
      description: 'Tesla faces concerns over its 4% NEV market share in China. Market cap loss parallels Kia\'s value amid innovation criticism.',
      type: 'performance',
      vsSector: 'BOTTOM 7%',
      vsSectorColor: 'red',
      vsSP500: 'BOTTOM 18%',
      vsSP500Color: 'red'
    },
    {
      id: 3,
      ticker: 'AMZN',
      name: 'Amazon',
      movement: 'MOVING UP',
      change: '+0.66%',
      changeColor: 'green',
      logo: 'a AMZN',
      description: 'Amazon rises amid mixed economic signals and strong services demand. CEO Jassy plans to sell shares as layoffs impact engineering roles.',
      type: 'trade',
      status: 'Sell Limit',
      statusColor: 'red',
      target: '171.18'
    },
    {
      id: 4,
      ticker: 'MSFT',
      name: 'Microsoft',
      movement: 'MOVING DOWN',
      change: '-1.52%',
      changeColor: 'red',
      logo: 'MSFT',
      description: 'Microsoft faces scrutiny over gaming and competition. Social media buzzes about new NVIDIA deployments and AI supercomputer plans.',
      type: 'performance',
      vsSector: 'TOP 17%',
      vsSectorColor: 'green',
      vsSP500: 'BOTTOM 1%',
      vsSP500Color: 'red'
    },
    {
      id: 5,
      ticker: 'EURUSD',
      name: 'Energy Markets',
      date: '21/11/2025 20:59',
      summary: 'SUMMARY',
      description: 'Energy Markets React to Breakthrough Peace Deal Between U.S., Russia, and Ukraine',
      tag: 'EURUSD'
    }
  ]

  const analysisCards = [
    {
      id: 1,
      ticker: 'ETH',
      name: 'Ethereum',
      movement: 'MOVING DOWN',
      change: '-3.7%',
      changeColor: 'red',
      logo: 'ETH',
      description: 'Ethereum drops below $3,000 amid market volatility. Retail selling of Bitcoin and ETH ETFs fuels correction, while BlackRock\'s ETH transfer',
      type: 'trade',
      status: 'Sell Limit',
      statusColor: 'red',
      target: '2560.00'
    },
    {
      id: 2,
      ticker: 'NVDA',
      name: 'NVIDIA',
      movement: 'MOVING DOWN',
      change: '-1.05%',
      changeColor: 'red',
      logo: 'NVDA',
      description: 'NVIDIA shares drop amid sector-wide decline. Concerns grow over revenue sustainability and inventory levels after strong jobs report.',
      type: 'performance',
      vsSector: 'BOTTOM 33%',
      vsSectorColor: 'red',
      vsSP500: 'BOTTOM 12%',
      vsSP500Color: 'red'
    },
    {
      id: 3,
      ticker: 'ROST',
      name: 'Ross Stores',
      movement: 'MOVING UP',
      change: '+7.44%',
      changeColor: 'green',
      logo: 'ROST',
      description: 'Ross Stores beats earnings expectations with $511.94M net income. Full-year EPS forecast raised, driving strong market activity today.',
      type: 'trade',
      status: 'Live Trade',
      statusColor: 'green',
      target: '175.02',
      readMore: true
    },
    {
      id: 4,
      ticker: 'META',
      name: 'Meta Platforms',
      movement: 'MOVING DOWN',
      change: '-0.25%',
      changeColor: 'red',
      logo: 'META',
      description: 'Meta is venturing into electricity trading for AI growth. A Spanish court ruling requires Meta to pay EUR 479 million for unfair competition.',
      type: 'performance',
      vsSector: 'BOTTOM 4%',
      vsSectorColor: 'red',
      vsSP500: 'BOTTOM 20%',
      vsSP500Color: 'red'
    },
    {
      id: 5,
      ticker: 'AMD',
      name: 'Advanced Micro Devices',
      movement: 'MOVING DOWN',
      change: '-2.8%',
      changeColor: 'red',
      logo: 'AMD',
      description: 'AMD stock declines amid negative AI CPU benchmark. U.S. Department of Energy partnership fails to boost sentiment.',
      type: 'performance',
      vsSector: 'BOTTOM 15%',
      vsSectorColor: 'red',
      vsSP500: 'BOTTOM 8%',
      vsSP500Color: 'red',
      readMore: true
    }
  ]

  const newsInsights = [
    {
      id: 1,
      date: '21/11/2025 21:35',
      category: 'MARKET INSIGHT',
      image: 'EURJPY',
      imageUrl: '/mt4.png',
      title: 'EUR/JPY declines amid broader market sentiment',
      description: 'EUR/JPY declines amid broader market sentiment. USD/JPY\'s drop influences EUR/JPY\'s trajectory, reflecting similar downward trends. The EUR/JPY currency pair has declined by 0.8% since the previous close. This movement coincides with a 0.54%',
      tag: 'EURJPY'
    },
    {
      id: 2,
      date: '21/11/2025 20:04',
      category: 'MACRO PREVIEW',
      image: 'Japan',
      imageUrl: '/japan.jpg',
      title: 'Japan\'s Manufacturing PMI Flash Shows Slight Improvement',
      description: 'Japan\'s Manufacturing PMI Flash Shows Slight Improvement at 48.8, Yet Signals Continued Contraction Amidst Economic Concerns and Market Volatility',
      tags: ['Economic Indicators', 'Market Sentiment', 'Sector Weakness'],
      partialText: 'At 00:30 UTC on November 21, 2025, the Jibun Bank'
    }
  ]

  const nextNews = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % marketNews.length)
  }

  const prevNews = () => {
    setCurrentNewsIndex((prev) => (prev - 1 + marketNews.length) % marketNews.length)
  }

  const nextAnalysis = () => {
    setCurrentAnalysisIndex((prev) => (prev + 1) % analysisCards.length)
  }

  const prevAnalysis = () => {
    setCurrentAnalysisIndex((prev) => (prev - 1 + analysisCards.length) % analysisCards.length)
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 overflow-x-hidden">
      <div className="w-full max-w-[95%] mx-auto">
        <h1 className="mb-6" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px', color: '#000000', fontWeight: '400' }}>
          Market News
        </h1>

        {/* Market News Carousel */}
        <div className="mb-8">
          {/* <h2 className="mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '400' }}>
            Market News
          </h2> */}
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
              {marketNews.map((news) => (
                <div
                  key={news.id}
                  className="min-w-[320px] bg-white rounded-lg p-6 border border-gray-200 shadow-md relative overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600"></div>
                  </div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className={`text-sm font-semibold mb-1 ${news.changeColor === 'red' ? 'text-red-600' : 'text-green-600'}`} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '600' }}>
                          {news.movement} {news.change}
                        </div>
                        {news.date && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>
                              {news.date}
                            </span>
                            <span className="text-xs text-gray-700 font-semibold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '600' }}>
                              {news.summary}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold ${news.changeColor === 'red' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '10px', fontWeight: '700' }}>
                        {news.logo}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-700 mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400', lineHeight: '1.5' }}>
                      {news.description}
                    </p>

                    {/* Performance or Trade Info */}
                    {news.type === 'performance' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>VS Sector</span>
                          <span className={`font-semibold ${news.vsSectorColor === 'red' ? 'text-red-600' : 'text-green-600'}`} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '600' }}>
                            {news.vsSector}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>VS S&P500</span>
                          <span className={`font-semibold ${news.vsSP500Color === 'red' ? 'text-red-600' : 'text-green-600'}`} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '600' }}>
                            {news.vsSP500}
                          </span>
                        </div>
                      </div>
                    )}

                    {news.type === 'trade' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>Status</span>
                          <span className={`font-semibold ${news.statusColor === 'red' ? 'text-red-600' : 'text-green-600'}`} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '600' }}>
                            {news.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>Target</span>
                          <span className="font-semibold text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '600' }}>
                            {news.target}
                          </span>
                        </div>
                      </div>
                    )}

                    {news.tag && (
                      <div className="mt-4">
                        <span className="px-2 py-1 bg-gray-200 rounded-full text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '10px', fontWeight: '400' }}>
                          {news.tag}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={prevNews}
                className="w-8 h-8 bg-black text-white rounded flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextNews}
                className="w-8 h-8 bg-black text-white rounded flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Trending Instruments Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px', color: '#000000', fontWeight: '600' }}>
              Trending Instruments
            </h2>
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Most Newsworthy Instruments - Scatter Plot */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
              <h3 className="mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#000000', fontWeight: '600' }}>
                Most Newsworthy Instruments
              </h3>
              <div className="h-80 bg-gray-50 rounded border border-gray-200 flex items-center justify-center relative">
                <svg width="100%" height="100%" viewBox="0 0 400 250" className="max-w-full max-h-full">
                  <defs>
                    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#f3f4f6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#e5e7eb', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="250" fill="url(#bgGradient)" />
                  {/* Grid lines */}
                  <line x1="0" y1="50" x2="400" y2="50" stroke="#d1d5db" strokeWidth="1" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#d1d5db" strokeWidth="1" />
                  <line x1="0" y1="150" x2="400" y2="150" stroke="#d1d5db" strokeWidth="1" />
                  <line x1="0" y1="200" x2="400" y2="200" stroke="#d1d5db" strokeWidth="1" />
                  <line x1="80" y1="0" x2="80" y2="250" stroke="#d1d5db" strokeWidth="1" />
                  <line x1="160" y1="0" x2="160" y2="250" stroke="#d1d5db" strokeWidth="1" />
                  <line x1="240" y1="0" x2="240" y2="250" stroke="#d1d5db" strokeWidth="1" />
                  <line x1="320" y1="0" x2="320" y2="250" stroke="#d1d5db" strokeWidth="1" />
                  {/* Scatter points */}
                  <circle cx="50" cy="30" r="4" fill="#3b82f6" />
                  <circle cx="120" cy="80" r="4" fill="#ef4444" />
                  <circle cx="180" cy="120" r="4" fill="#10b981" />
                  <circle cx="250" cy="60" r="4" fill="#f59e0b" />
                  <circle cx="320" cy="150" r="4" fill="#8b5cf6" />
                  <circle cx="80" cy="200" r="4" fill="#ec4899" />
                  <circle cx="150" cy="40" r="4" fill="#06b6d4" />
                  <circle cx="220" cy="100" r="4" fill="#84cc16" />
                  <circle cx="290" cy="180" r="4" fill="#f97316" />
                  <circle cx="60" cy="90" r="4" fill="#6366f1" />
                  <circle cx="140" cy="160" r="4" fill="#14b8a6" />
                  <circle cx="200" cy="50" r="4" fill="#eab308" />
                  <circle cx="280" cy="130" r="4" fill="#a855f7" />
                  <circle cx="100" cy="70" r="4" fill="#dc2626" />
                  <circle cx="170" cy="110" r="4" fill="#059669" />
                  {/* Axis labels */}
                  <text x="200" y="240" textAnchor="middle" fontSize="12" fill="#6b7280">Market Sentiment</text>
                  <text x="10" y="125" textAnchor="middle" fontSize="12" fill="#6b7280" transform="rotate(-90 10 125)">News Volume</text>
                </svg>
                <div className="absolute inset-0 pointer-events-none">
                  <div className="MostNewsworthyInstruments__quadrantNames__Vdwos w-full h-full relative">
                    <div className="absolute top-2 left-2 text-xs text-gray-600">Warning Signs</div>
                    <div className="absolute top-2 right-2 text-xs text-gray-600">Best Performers</div>
                    <div className="absolute bottom-2 left-2 text-xs text-gray-600">Worst Performers</div>
                    <div className="absolute bottom-2 right-2 text-xs text-gray-600">Growth Potential</div>
                  </div>
                </div>
              </div>
            </div>

            {/* News & Insights */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md max-h-[400px] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#000000', fontWeight: '600' }}>
                  News & Insights
                </h3>
                <span className="px-2 py-1 bg-gray-200 rounded-full text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '10px', fontWeight: '400' }}>
                  EURJPY
                </span>
              </div>

              <div className="space-y-4">
                {newsInsights.map((item) => (
                  <div key={item.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-500" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>
                        {item.date}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-semibold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '10px', fontWeight: '600' }}>
                        {item.category}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-[30%]">
                        <img src={item.imageUrl} alt={item.image} className="w-full h-36 object-fit rounded" />
                      </div>
                      <div className="w-[70%]">
                        <h4 className="font-semibold mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', color: '#000000', fontWeight: '600' }}>
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400', lineHeight: '1.5' }}>
                          {item.description}
                        </p>
                        {item.tags && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {item.tags.map((tag, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 rounded-full text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '10px', fontWeight: '400' }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        {item.partialText && (
                          <p className="text-xs text-gray-500 italic" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>
                            {item.partialText}...
                          </p>
                        )}
                        <button className="mt-2 px-4 py-2 bg-gray-800 text-white text-xs font-semibold rounded hover:bg-gray-900 transition-colors" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '600' }}>
                          FIND OUT MORE
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Section */}
        <div>
          <h2 className="mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '400' }}>
            Analysis
          </h2>
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
              {analysisCards.map((card) => (
                <div
                  key={card.id}
                  className="min-w-[320px] bg-white rounded-lg p-6 border border-gray-200 shadow-md relative overflow-hidden"
                >
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className={`text-sm font-semibold mb-1 ${card.changeColor === 'red' ? 'text-red-600' : 'text-green-600'}`} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '600' }}>
                          {card.movement} {card.change}
                        </div>
                      </div>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold ${card.changeColor === 'red' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '10px', fontWeight: '700' }}>
                        {card.logo}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-700 mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', fontWeight: '400', lineHeight: '1.5' }}>
                      {card.description}
                    </p>

                    {/* Performance or Trade Info */}
                    {card.type === 'performance' && (
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>VS Sector</span>
                          <span className={`font-semibold ${card.vsSectorColor === 'red' ? 'text-red-600' : 'text-green-600'}`} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '600' }}>
                            {card.vsSector}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>VS S&P500</span>
                          <span className={`font-semibold ${card.vsSP500Color === 'red' ? 'text-red-600' : 'text-green-600'}`} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '600' }}>
                            {card.vsSP500}
                          </span>
                        </div>
                      </div>
                    )}

                    {card.type === 'trade' && (
                      <div className="space-y-2 mb-4">
                        <div className="text-xs font-semibold mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '600', color: '#000000' }}>
                          Trade Idea
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>Status</span>
                          <span className={`font-semibold ${card.statusColor === 'red' ? 'text-red-600' : 'text-green-600'}`} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '600' }}>
                            {card.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>Target</span>
                          <span className="font-semibold text-gray-800" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '600' }}>
                            {card.target}
                          </span>
                        </div>
                      </div>
                    )}

                    {card.readMore && (
                      <button className="text-sm text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '500' }}>
                        READ MORE
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={prevAnalysis}
                className="w-8 h-8 bg-black text-white rounded flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextAnalysis}
                className="w-8 h-8 bg-black text-white rounded flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketNews
