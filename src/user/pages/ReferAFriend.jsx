import { useState } from 'react'

function ReferAFriend() {
  const [activeTab, setActiveTab] = useState('spread')

  const commissionStructures = {
    spread: {
      title: 'Spread Commission',
      description: 'Earn commissions based on the spread of each trade',
      features: [
        { label: 'Commission Rate', value: 'Up to 50%' },
        { label: 'Payment Frequency', value: 'Weekly' },
        { label: 'Minimum Volume', value: '10 Lots' },
        { label: 'Commission Type', value: 'Per Trade' }
      ],
      benefits: [
        'Competitive commission rates',
        'Transparent pricing structure',
        'Real-time commission tracking',
        'Flexible payment options'
      ]
    },
    pip: {
      title: 'Pip Commission',
      description: 'Receive fixed commission per pip for every trade',
      features: [
        { label: 'Commission Rate', value: '$5 - $15 per pip' },
        { label: 'Payment Frequency', value: 'Monthly' },
        { label: 'Minimum Volume', value: '5 Lots' },
        { label: 'Commission Type', value: 'Per Pip' }
      ],
      benefits: [
        'Fixed commission per pip',
        'Predictable earnings',
        'Higher rates for major pairs',
        'Volume-based bonuses'
      ]
    },
    fixedLot: {
      title: 'Fixed Lot Commission',
      description: 'Earn a fixed amount for each lot traded by your clients',
      features: [
        { label: 'Commission Rate', value: '$10 - $50 per lot' },
        { label: 'Payment Frequency', value: 'Bi-weekly' },
        { label: 'Minimum Volume', value: '20 Lots' },
        { label: 'Commission Type', value: 'Per Lot' }
      ],
      benefits: [
        'Fixed rate per lot',
        'Simple calculation',
        'No spread dependency',
        'Tier-based rates'
      ]
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      <div className="w-full max-w-[95%] mx-auto">
        {/* Top Image Banner Section */}
        <div className="relative mt-5 rounded-lg overflow-hidden" style={{ minHeight: '300px' }}>
          <div 
            className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800"
            style={{ 
              minHeight: '300px',
              backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-800/80"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-6 sm:p-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700' }}>
                Partner's Cabinet
                </h1>
              <p className="text-base sm:text-lg mb-6 text-center max-w-2xl opacity-90" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                Join our partner program and earn competitive commissions through multiple commission structures
              </p>
              <a
                href="https://cabinet.solitaire.partners/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-500 hover:bg-brand-600 text-dark-base px-8 py-3 rounded-lg font-semibold transition-colors text-base sm:text-lg"
                      style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}
                    >
                Become Partner
              </a>
            </div>
          </div>
        </div>

        <div className="w-full p-3 sm:p-4 lg:p-6">
          {/* Commission Structure Tabs */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold mb-6" style={{ fontFamily: 'Roboto, sans-serif', color: '#000000', fontWeight: '700' }}>
              Commission Structures
              </h2>
            
            {/* Tab Buttons */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
              {Object.keys(commissionStructures).map((key) => (
                  <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-2 font-semibold transition-colors border-b-2 ${
                    activeTab === key
                      ? 'border-brand-500 text-brand-500'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '600' }}
                  >
                  {commissionStructures[key].title}
                  </button>
                ))}
            </div>

            {/* Active Tab Content */}
            {activeTab && commissionStructures[activeTab] && (
              <div className="space-y-6">
                  <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ fontFamily: 'Roboto, sans-serif', color: '#000000', fontWeight: '700' }}>
                    {commissionStructures[activeTab].title}
                  </h3>
                  <p className="text-gray-600 mb-6" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '400' }}>
                    {commissionStructures[activeTab].description}
                  </p>
              </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {commissionStructures[activeTab].features.map((feature, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>
                        {feature.label}
                  </div>
                      <div className="text-lg font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '700' }}>
                        {feature.value}
                    </div>
                    </div>
                  ))}
              </div>

                {/* Benefits Section */}
                <div className="bg-brand-50 rounded-lg p-6 border border-brand-200">
                  <h4 className="text-lg font-bold mb-4" style={{ fontFamily: 'Roboto, sans-serif', color: '#000000', fontWeight: '700' }}>
                    Key Benefits
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {commissionStructures[activeTab].benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                        <span className="text-gray-700" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                          {benefit}
                        </span>
                  </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
              </div>

          {/* Additional Information Section */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ fontFamily: 'Roboto, sans-serif', color: '#000000', fontWeight: '700' }}>
              Why Become a Partner?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Roboto, sans-serif', color: '#000000', fontWeight: '600' }}>
                  Competitive Rates
                </h3>
                <p className="text-black text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                  Earn industry-leading commission rates with flexible payment options
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Roboto, sans-serif', color: '#000000', fontWeight: '600' }}>
                  Real-time Tracking
                </h3>
                <p className="text-black text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                  Monitor your earnings and client activity in real-time through our partner dashboard
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Roboto, sans-serif', color: '#000000', fontWeight: '600' }}>
                  Dedicated Support
                </h3>
                <p className="text-black text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                  Get dedicated support from our partner team to help you maximize your earnings
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg shadow-md p-6 sm:p-8 text-center text-black">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700', color: '#000000' }}>
              Ready to Start Earning?
            </h2>
            <p className="text-base sm:text-lg mb-6 max-w-2xl mx-auto" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400', color: '#000000' }}>
              Join thousands of partners already earning with Solitaire Markets. Get started today and unlock your earning potential.
            </p>
            <a
              href="https://cabinet.solitaire.partners/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors text-base sm:text-lg"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '600', color: '#000000' }}
            >
              Become Partner Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReferAFriend
