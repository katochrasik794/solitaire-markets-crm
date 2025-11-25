import { useState } from 'react'

function ReferAFriend() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('all')
  const [copied, setCopied] = useState(false)

  const referralLink = 'https://portal.my-Solitaire.com/sc/register...'

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const badges = [
    {
      id: 1,
      name: 'Referral Starter',
      description: 'To earn this badge and get rewarded with $10 refer us to 5 of your friends.',
      progress: 0,
      target: 5,
      reward: '$10',
      icon: (
        <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    },
    {
      id: 2,
      name: 'Referral Influencer',
      description: 'To earn this badge and get rewarded with $20 refer us to 10 of your friends.',
      progress: 0,
      target: 10,
      reward: '$20',
      icon: (
        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      id: 3,
      name: 'Referral Expert',
      description: 'To earn this badge and get rewarded with $30 refer us to 20 of your friends.',
      progress: 0,
      target: 20,
      reward: '$30',
      icon: (
        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      id: 4,
      name: 'Referral Master',
      description: 'To earn this badge and get rewarded with $40 refer us to 30 of your friends.',
      progress: 0,
      target: 30,
      reward: '$40',
      icon: (
        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      id: 5,
      name: 'Referral Champion',
      description: 'To earn this badge and get rewarded with $100 refer us to 50 of your friends.',
      progress: 0,
      target: 50,
      reward: '$100',
      icon: (
        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      <div className="w-full max-w-[95%] mx-auto">
        {/* Top Banner Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-600 rounded-lg text-white mt-5 p-4 sm:p-6" style={{ minHeight: '220px' }}>
        <div className="w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center min-h-full">
            <div className="text-center lg:text-left">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700' }}>
                Refer Friends. Earn Rewards. Trade. Repeat.
              </h1>
              <p className="text-sm sm:text-base mb-3 sm:mb-4 opacity-90" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                Share your friends a new experience
              </p>

              {/* Referral Link */}
              <div className="mb-2 sm:mb-3">
                <div className="flex flex-col sm:flex-row gap-2 mb-1 sm:mb-2">
                  <input
                    type="text"
                    readOnly
                    value={referralLink}
                    className="flex-1 px-2 sm:px-3 py-2 bg-white text-gray-800 rounded-lg border border-gray-300 text-xs sm:text-sm"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-3 sm:px-4 py-2 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap text-xs sm:text-sm"
                    style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}
                  >
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>

                {/* Social Sharing Icons */}
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1 sm:mb-2">
                  <button className="w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
                    <span className="text-white font-bold text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700' }}>f</span>
                  </button>
                  <button className="w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
                    <span className="text-white font-bold text-xs sm:text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700' }}>X</span>
                  </button>
                  <button className="w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </button>
                  <button className="w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>

                <p className="text-xs opacity-80 text-center lg:text-left" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                  By using this link, you are deemed to have agreed to the applicable{' '}
                  <a href="#" className="underline hover:opacity-70">Terms and Conditions</a>.
                </p>
              </div>

            </div>

            {/* Right Side - How it works, QR and Download Buttons */}
            <div className="flex flex-col items-center lg:items-end justify-center gap-3 sm:gap-4 mt-4 lg:mt-0 lg:pr-4">
              {/* How it works Button */}
              <button className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors w-40 sm:w-44 lg:w-48 text-sm sm:text-base" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}>
                How it works
              </button>
              
              {/* QR and Download Section */}
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                {/* QR Code */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-white rounded-lg p-1 sm:p-2 flex items-center justify-center">
                  <div className="w-full h-full bg-black rounded" style={{
                    backgroundImage: `url(/qr-scanner.png)`,
                    backgroundSize: 'cover'
                  }}>
                  </div>
                </div>
                
                {/* Download Button */}
                <button className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-3 sm:p-4 lg:p-6">
        {/* Referral Summary Section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-0" style={{ fontFamily: 'Roboto, sans-serif', color: '#000000', fontWeight: '700' }}>
              Referral Summary
            </h2>
            <div className="flex gap-2">
              {['all', 'week', 'month'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedTimeFilter(filter)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedTimeFilter === filter
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '600' }}
                >
                  {filter === 'all' ? 'All Time' : filter === 'week' ? 'This Week' : 'This Month'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>
                    Total Invited Friends
                  </div>
                  <div className="text-2xl font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px', color: '#000000', fontWeight: '700' }}>
                    0
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>
                    Rewarded Friends
                  </div>
                  <div className="text-2xl font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px', color: '#000000', fontWeight: '700' }}>
                    0
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>
                    Total Earning
                  </div>
                  <div className="text-2xl font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px', color: '#000000', fontWeight: '700' }}>
                    $0
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center relative">
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                  <svg className="w-4 h-4 text-gray-600 absolute top-0 right-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>
                    Rewards in Progress
                  </div>
                  <div className="text-2xl font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px', color: '#000000', fontWeight: '700' }}>
                    $0
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collect Badges Section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px', color: '#000000', fontWeight: '700' }}>
                Collect Badges And Earn More
              </h2>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                Unlock all these badges to earn your place with us as Solitaire Influencer,{' '}
                <a href="#" className="text-[#00A896] hover:underline">Learn More</a>
              </p>
            </div>
            <div className="text-sm text-gray-600 mt-2 sm:mt-0" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
              Number Of Earned Badges | 0 Badges
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {badges.map((badge) => (
              <div key={badge.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex flex-col items-center text-center mb-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                    {badge.icon}
                  </div>
                  <h3 className="font-semibold mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '13px', color: '#000000', fontWeight: '600' }}>
                    {badge.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400', lineHeight: '1.4' }}>
                    {badge.description}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className="bg-[#00A896] h-2 rounded-full"
                      style={{ width: `${(badge.progress / badge.target) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', fontWeight: '400' }}>
                    {badge.progress}/{badge.target}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referrals List Section */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px', color: '#000000', fontWeight: '700' }}>
            Referrals List
          </h2>
          <div className="h-14 flex items-center justify-center border-2 border-solid border-gray-300 rounded-lg">
            <p className="text-gray-500 text-center" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '400' }}>
              Refer your friends and share with them new trading experience
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ReferAFriend
