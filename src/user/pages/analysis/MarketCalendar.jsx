import { useState } from 'react'

function MarketCalendar() {
  const [calendarType, setCalendarType] = useState('ECONOMIC')
  const [selectedDate, setSelectedDate] = useState('2025-11-21')
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const events = {
    '2025-11-17': [
      { id: 1, country: 'US', countryCode: 'US', name: '3-Month Bill Auction', time: '22:00', badge: 17, color: 'green' },
      { id: 2, country: 'US', countryCode: 'US', name: 'Fed\'s Kashkari speech', time: '23:30', badge: 21, color: 'grey' },
      { id: 3, country: 'CA', countryCode: 'CA', name: 'Consumer Price Index (YoY)', time: '19:00', badge: 3, color: 'red' }
    ],
    '2025-11-18': [
      { id: 4, country: 'US', countryCode: 'US', name: 'NAHB Housing Market Index', time: '20:30', badge: 7, color: 'green' },
      { id: 5, country: 'GB', countryCode: 'GB', name: 'BoE\'s Dhingra speech', time: '22:30', badge: 9, color: 'grey' },
      { id: 6, country: 'AU', countryCode: 'AU', name: 'RBA Meeting Minutes', time: '06:00', badge: 3, color: 'red' }
    ],
    '2025-11-19': [
      { id: 7, country: 'US', countryCode: 'US', name: '20-Year Bond Auction', time: '23:30', badge: 27, color: 'green' },
      { id: 8, country: 'US', countryCode: 'US', name: 'Fed\'s Miran speech', time: '20:30', badge: 13, color: 'grey' },
      { id: 9, country: 'GB', countryCode: 'GB', name: 'Core Consumer Price Index (YoY)', time: '12:30', badge: 3, color: 'red' }
    ],
    '2025-11-20': [
      { id: 10, country: 'US', countryCode: 'US', name: '10-year TIPS Auction', time: '23:30', badge: 41, color: 'green' },
      { id: 11, country: 'US', countryCode: 'US', name: 'Fed\'s Cook speech', time: '21:30', badge: 15, color: 'grey' },
      { id: 12, country: 'US', countryCode: 'US', name: 'Labor Force Participation Rate', time: '19:00', badge: 8, color: 'red' }
    ],
    '2025-11-21': [
      { id: 13, country: 'US', countryCode: 'US', name: 'Baker Hughes US Oil Rig Count', time: '23:30', badge: 15, color: 'green' },
      { id: 14, country: 'GB', countryCode: 'GB', name: 'BoE\'s Pill speech', time: '21:10', badge: 42, color: 'grey' },
      { id: 15, country: 'US', countryCode: 'US', name: 'S&P Global Manufacturing PMI', time: '20:15', badge: 14, color: 'red' }
    ],
    '2025-11-22': [
      { id: 16, country: 'US', countryCode: 'US', name: 'CFTC S&P 500 NC Net Positions', time: '02:00', badge: 8, color: 'green' },
      { id: 17, country: 'EMU', countryCode: 'EMU', name: 'ECB\'s President Lagarde speech', time: '13:30', badge: 2, color: 'red' }
    ],
    '2025-11-23': []
  }

  const detailedEvents = [
    {
      id: 1,
      impact: 'Medium',
      country: 'US',
      name: 'UoM 5-year Consumer Inflation Expectation',
      time: '20:30',
      actual: '3.4%',
      actualColor: 'red',
      previous: '3.6%',
      forecast: '3.6%'
    },
    {
      id: 2,
      impact: 'Low',
      impactOutline: true,
      country: 'US',
      name: 'Wholesale Inventories',
      time: '20:30',
      actual: '0%',
      actualColor: 'green',
      previous: '-0.2%',
      forecast: '-0.2%'
    },
    {
      id: 3,
      impact: 'Medium',
      country: 'US',
      name: 'Michigan Consumer Expectations Index',
      time: '20:30',
      actual: '51',
      actualColor: 'green',
      previous: '49',
      forecast: '49'
    },
    {
      id: 4,
      impact: 'Medium',
      country: 'US',
      name: 'Michigan Consumer Sentiment Index',
      time: '20:30',
      actual: '51',
      actualColor: 'green',
      previous: '50.3',
      forecast: '50.5'
    },
    {
      id: 5,
      impact: 'Medium',
      country: 'US',
      name: 'UoM 1-year Consumer Inflation Expectations',
      time: '20:30',
      actual: '4.5%',
      actualColor: 'red',
      previous: '4.7%',
      forecast: '4.7%'
    },
    {
      id: 6,
      impact: 'Medium',
      country: 'GB',
      name: 'BoE\'s Pill speech',
      time: '21:10',
      actual: '-',
      previous: '-',
      forecast: '-'
    },
    {
      id: 7,
      impact: 'Low',
      impactOutline: true,
      country: 'US',
      name: 'Baker Hughes US Oil Rig Count',
      time: '23:30',
      timeUntil: '58m',
      previous: '417',
      forecast: '418',
      actual: '-'
    }
  ]

  const days = [
    { date: '2025-11-17', day: 'MON', dayNum: '17.11' },
    { date: '2025-11-18', day: 'TUE', dayNum: '18.11' },
    { date: '2025-11-19', day: 'WED', dayNum: '19.11' },
    { date: '2025-11-20', day: 'THU', dayNum: '20.11' },
    { date: '2025-11-21', day: 'FRI', dayNum: '21.11', isToday: true },
    { date: '2025-11-22', day: 'SAT', dayNum: '22.11' },
    { date: '2025-11-23', day: 'SUN', dayNum: '23.11' }
  ]

  const getBadgeColor = (color) => {
    if (color === 'green') return 'bg-green-500 border-green-500'
    if (color === 'red') return 'bg-red-500 border-red-500'
    return 'bg-gray-400 border-gray-400'
  }

  const getBorderColor = (color) => {
    if (color === 'green') return 'border-green-500'
    if (color === 'red') return 'border-red-500'
    return 'border-gray-400'
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 overflow-x-hidden">
      <div className="w-full max-w-[95%] mx-auto">
        <h1 className="mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px', color: '#000000', fontWeight: '400' }}>
          Market Calendar
        </h1>

        {/* Filter and Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsFilterModalOpen(true)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors" 
              style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '600', color: '#000000' }}
            >
              FILTERS
            </button>
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400', color: '#000000' }}>
                NOV 17, 2025 - NOV 23, 2025
              </span>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCalendarType('ECONOMIC')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                calendarType === 'ECONOMIC'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
              style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '600' }}
            >
              ECONOMIC
            </button>
            <button
              onClick={() => setCalendarType('CORPORATE')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                calendarType === 'CORPORATE'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
              style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '600' }}
            >
              CORPORATE
            </button>
          </div>
        </div>

        {/* Main Title */}
        <h2 className="mb-6 text-2xl font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '28px', color: '#000000', fontWeight: '700' }}>
          {calendarType === 'ECONOMIC' ? 'Economic Calendar' : 'Corporate Calendar'}
        </h2>

        {/* Calendar Grid View */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
          <div className="grid grid-cols-7 gap-4">
            {days.map((day) => (
              <div key={day.date} className="flex flex-col">
                {/* Day Header */}
                <div className={`text-center mb-3 pb-2 ${day.isToday ? 'bg-blue-50 rounded' : ''}`}>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-sm font-semibold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', color: '#000000', fontWeight: '600' }}>
                      {day.day}
                    </span>
                    {day.isToday && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-xs text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>
                    {day.dayNum}
                  </span>
                </div>

                {/* Events for this day */}
                <div className="space-y-2 min-h-[200px]">
                  {events[day.date] && events[day.date].length > 0 ? (
                    events[day.date].map((event) => (
                      <div
                        key={event.id}
                        className={`bg-white border-2 ${getBorderColor(event.color)} rounded-lg p-2 relative cursor-pointer hover:shadow-md transition-shadow`}
                        onClick={() => setSelectedDate(day.date)}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-1">
                            <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center text-xs font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '9px', fontWeight: '700' }}>
                              {event.countryCode}
                            </div>
                            <span className="text-xs font-semibold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '10px', color: '#000000', fontWeight: '600' }}>
                              {event.name}
                            </span>
                          </div>
                          <div className={`absolute top-1 right-1 w-6 h-6 ${getBadgeColor(event.color)} text-white rounded-full flex items-center justify-center text-xs font-bold`} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '9px', fontWeight: '700' }}>
                            {event.badge}
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 mt-1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '10px', fontWeight: '400' }}>
                          {event.time}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-center h-20">
                      <span className="text-xs text-gray-400" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>
                        NO EVENTS
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Events View for Selected Date */}
        {selectedDate === '2025-11-21' && (
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="mb-4 text-lg font-semibold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '600' }}>
              Friday 21.11
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {detailedEvents.map((event) => (
                <div
                  key={event.id}
                  className={`min-w-[280px] bg-white border-2 ${
                    event.impactOutline ? 'border-green-500' : 'border-gray-300'
                  } rounded-lg p-4`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      event.impactOutline
                        ? 'border border-green-500 text-green-700 bg-white'
                        : 'bg-gray-200 text-gray-700'
                    }`} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '10px', fontWeight: '600' }}>
                      {event.impact} Impact
                    </span>
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-xs font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '9px', fontWeight: '700' }}>
                      {event.country}
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', color: '#000000', fontWeight: '600' }}>
                    {event.name}
                  </h4>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>
                      {event.time}
                    </span>
                    {event.timeUntil && (
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.timeUntil}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>Actual</span>
                      <span className={`font-semibold ${event.actualColor === 'red' ? 'text-red-600' : event.actualColor === 'green' ? 'text-green-600' : 'text-gray-700'}`} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '600' }}>
                        {event.actual}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>Previous</span>
                      <span className="font-semibold text-gray-700" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '600' }}>
                        {event.previous}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>Forecast</span>
                      <span className="font-semibold text-gray-700" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '600' }}>
                        {event.forecast}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter Modal - Same as other pages */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setIsFilterModalOpen(false)}>
          <div className="bg-gray-100 rounded-lg w-full max-w-2xl mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="text-gray-800 hover:text-black transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-center text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                Filter options coming soon
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MarketCalendar
