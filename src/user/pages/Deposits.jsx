import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.js';

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL?.replace('/api', '') || import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

function Deposits() {
  const navigate = useNavigate();
  const [gateways, setGateways] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGateways();
  }, []);

  const fetchGateways = async () => {
    try {
      setLoading(true);
      const token = authService.getToken();
      const response = await fetch(`${API_BASE_URL}/deposits/gateways`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setGateways(data.gateways || []);
        }
      }
    } catch (error) {
      console.error('Error fetching gateways:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGatewayClick = (gateway) => {
    navigate(`/user/deposits/${gateway.id}?step=1`);
  };

  // Group gateways
  const recommendedGateways = gateways.filter(g => g.is_recommended);
  const cryptoGateways = gateways.filter(g => g.type === 'crypto' && !g.is_recommended);
  const wireGateways = gateways.filter(g => g.type === 'wire');
  const otherGateways = gateways.filter(g => !g.is_recommended && g.type !== 'crypto' && g.type !== 'wire');

  const renderGatewayCard = (gateway) => (
    <div
      key={gateway.id}
      onClick={() => handleGatewayClick(gateway)}
      className="bg-gray-200 rounded-lg p-2.5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between"
    >
      <div className="flex items-center flex-1">
        <div className="w-14 h-14 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 overflow-hidden bg-transparent">
          {gateway.icon_url ? (
            <img src={gateway.icon_url} alt={gateway.name} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full bg-gray-300 rounded"></div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="mb-0.5" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', color: '#000000', fontWeight: '400' }}>
            {gateway.name}
          </h3>
          <p className="text-gray-600 mb-0.5" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>
            Fee: 0% Time: {gateway.type === 'wire' ? '1-3 days' : 'Instant'}
          </p>
          <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>
            Currencies: USD, EUR, GBP & more
          </p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-black ml-3 flex-shrink-0" />
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 overflow-x-hidden">
      <div className="max-w-2xl w-full">
        <h1 className="mb-6" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px', color: '#000000', fontWeight: '400' }}>
          Deposit types
        </h1>

        {loading ? (
          <div className="text-center py-8">Loading deposit methods...</div>
        ) : (
          <>
            {/* Recommended methods */}
            {recommendedGateways.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '400' }}>
                  Recommended methods
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommendedGateways.map(renderGatewayCard)}
                </div>
              </div>
            )}

            {/* Additional Payment Methods */}
            {otherGateways.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '400' }}>
                  Additional Payment Methods
                </h2>
                <p className="text-gray-600 mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                  Explore More Ways to Deposit Funds.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {otherGateways.map(renderGatewayCard)}
                </div>
              </div>
            )}

            {/* Cryptocurrencies */}
            {cryptoGateways.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '400' }}>
                  Cryptocurrencies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cryptoGateways.map(renderGatewayCard)}
                </div>
              </div>
            )}

            {/* Bank transfers */}
            {wireGateways.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#000000', fontWeight: '400' }}>
                  Bank transfers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wireGateways.map(renderGatewayCard)}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', fontWeight: '400' }}>
                if you are using a new payment method that was not used before, your deposit might not be applied immediately into your account and might take up to 24 hours to be reviewed and processed. On some occasions we might request a proof that the card or payment account is under your name.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Deposits;
