import { useState, useEffect, useRef } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import TickerImageModal from './TickerImageModal.jsx';

function Ticker({ ticker, onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const tickerRef = useRef(null);
  const animationRef = useRef(null);

  // Note: Removed auto-hide feature - tickers stay visible until:
  // 1. User manually closes them (X button)
  // 2. Admin deactivates them in the dashboard
  // Tickers will automatically disappear when they're no longer active (checked every 30s)

  // Smooth infinite scrolling animation - marquee effect
  useEffect(() => {
    if (!tickerRef.current || !isVisible) return;

    const element = tickerRef.current;
    const content = element.querySelector('.ticker-content');
    if (!content) return;

    // Wait for content to render and measure
    const initAnimation = () => {
      const speed = ticker.animation_speed || 50; // pixels per second
      const containerWidth = element.offsetWidth;
      
      // Get width of first copy (half of total content since we duplicate)
      const firstCopy = content.querySelector('div:first-child');
      if (!firstCopy) return;
      
      const contentWidth = firstCopy.offsetWidth;
      
      // Always animate if content is wider than container
      // If content fits, we can still animate it for a smooth effect, but it's optional
      if (contentWidth <= containerWidth) {
        // Content fits - center it or keep it static
        // For now, keep it static if it fits, but ensure it's visible
        content.style.animation = 'none';
        content.style.justifyContent = 'center';
        return;
      }
      
      // Reset justify-content for scrolling content
      content.style.justifyContent = 'flex-start';

      // Calculate duration for one full cycle (one copy width)
      const duration = contentWidth / speed; // seconds to scroll one copy

      // Create unique animation name
      const animationId = `ticker-scroll-${ticker.id || Date.now()}`;
      
      // Create infinite scroll animation - moves from right edge to left edge
      const keyframes = `
        @keyframes ${animationId} {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${contentWidth}px);
          }
        }
      `;

      // Inject styles
      let styleSheet = document.getElementById(`ticker-style-${ticker.id}`);
      if (!styleSheet) {
        styleSheet = document.createElement('style');
        styleSheet.id = `ticker-style-${ticker.id}`;
        document.head.appendChild(styleSheet);
      }
      styleSheet.textContent = keyframes;

      // Apply animation - infinite loop
      content.style.animation = `${animationId} ${duration}s linear infinite`;
      content.style.animationPlayState = 'running';
    };

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(initAnimation, 100);
    
    // Also try on window resize
    const handleResize = () => {
      clearTimeout(timeout);
      setTimeout(initAnimation, 100);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
      // Clean up on unmount
      const sheet = document.getElementById(`ticker-style-${ticker.id}`);
      if (sheet && sheet.parentNode) {
        document.head.removeChild(sheet);
      }
    };
  }, [ticker.animation_speed, ticker.id, isVisible, ticker.title, ticker.message]);

  if (!isVisible) return null;

  const handleImageClick = () => {
    if (ticker.image_url) {
      setShowImageModal(true);
    } else if (ticker.link_url) {
      window.open(ticker.link_url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <>
      <div
        ref={tickerRef}
        className="relative w-full bg-gradient-to-r from-brand-500 to-brand-600 text-dark-base overflow-hidden z-40"
        style={{
          minHeight: '48px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          position: 'relative',
        }}
      >
        <div className="flex items-center h-full relative overflow-hidden">
          {/* Content wrapper for scrolling - duplicate for seamless loop */}
          <div className="ticker-content flex items-center gap-4 px-4 py-3 whitespace-nowrap">
            {/* First copy */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {ticker.title && (
                <span className="font-semibold text-sm md:text-base text-dark-base">{ticker.title}</span>
              )}
              {ticker.message && (
                <span className="text-sm md:text-base text-dark-base">{ticker.message}</span>
              )}
              {ticker.image_url && (
                <ImageIcon className="w-5 h-5 flex-shrink-0 cursor-pointer hover:opacity-80 transition text-dark-base" />
              )}
              {ticker.link_url && !ticker.image_url && (
                <span className="text-xs underline opacity-90 text-dark-base">Click to view</span>
              )}
            </div>
            {/* Duplicate for seamless infinite scroll */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {ticker.title && (
                <span className="font-semibold text-sm md:text-base text-dark-base">{ticker.title}</span>
              )}
              {ticker.message && (
                <span className="text-sm md:text-base text-dark-base">{ticker.message}</span>
              )}
              {ticker.image_url && (
                <ImageIcon className="w-5 h-5 flex-shrink-0 cursor-pointer hover:opacity-80 transition text-dark-base" />
              )}
              {ticker.link_url && !ticker.image_url && (
                <span className="text-xs underline opacity-90 text-dark-base">Click to view</span>
              )}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-black/10 rounded-full transition z-10"
            aria-label="Close ticker"
          >
            <X className="w-4 h-4 text-dark-base" />
          </button>
        </div>

        {/* Clickable overlay for image/link */}
        {(ticker.image_url || ticker.link_url) && (
          <button
            onClick={handleImageClick}
            className="absolute inset-0 w-full h-full z-0"
            aria-label={ticker.image_url ? 'View image' : 'Open link'}
          />
        )}
      </div>

      {/* Image Modal */}
      {showImageModal && ticker.image_url && (
        <TickerImageModal
          imageUrl={ticker.image_url}
          title={ticker.title}
          duration={ticker.display_duration}
          onClose={() => setShowImageModal(false)}
        />
      )}
    </>
  );
}

export default Ticker;

