import React from 'react';

interface CardConnectionSectionProps {
  isConnectingCard: boolean;
  isCardConnected: boolean;
  handleConnectCard: () => void;
}

const CardConnectionSection = ({
  isConnectingCard,
  isCardConnected,
  handleConnectCard
}: CardConnectionSectionProps) => {
  return (
    <section className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Connect Your Card</h2>
      <p className="mb-4">Link your card to automatically import transactions</p>
      <button 
        onClick={handleConnectCard}
        disabled={isConnectingCard || isCardConnected}
        className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg font-medium shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isConnectingCard ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Connecting...
          </>
        ) : isCardConnected ? (
          'Card Connected ✓'
        ) : (
          'Connect Card'
        )}
      </button>
    </section>
  );
};

export default CardConnectionSection;