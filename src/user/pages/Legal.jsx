function Legal() {
  const legalLinks = [
    'Terms and Conditions for Swap Free accounts',
    'Payments Terms and Conditions',
    'Order Execution Policy',
    'Risk Warning Disclosure',
    'Client Complaints Handling Procedure',
    'Cookies Policy',
    'Privacy Policy',
    'Terms and Conditions',
    'Clients Agreement',
    'Conflicts of Interest Policy',
    'Terms of Use',
    'Website Acceptable Use Policy'
  ]

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 overflow-x-hidden">
      <div className="w-full max-w-[100%] mx-auto">
        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          {/* Heading */}
          <h1 className="text-start text-xl font-medium mb-8" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px', color: '#000000', fontWeight: '400' }}>
            Legal Terms and Policies
          </h1>

          {/* Legal Links List */}
          <div className="space-y-3 mb-8">
            {legalLinks.map((link, index) => (
              <div key={index}>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 underline"
                  style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '400' }}
                >
                  {link}
                </a>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 my-8"></div>

          {/* Disclaimer Section */}
          <div>
            <h2 className="font-bold mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '400' }}>
              Trading involves a high degree of risk
            </h2>
            <p className="text-gray-700" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400', lineHeight: '1.6' }}>
              Solitaire Brokerage (Seychelles) Limited is a registered trading name in Seychelles (License Number SD064) which is authorized and regulated by the Financial Services Authority with its company address at First Floor, Marina House, Eden Island, Republic of Seychelles.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Legal
