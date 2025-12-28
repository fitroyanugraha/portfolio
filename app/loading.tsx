/**
 * Global loading state for pages
 */
export default function Loading() {
    return (
        <div className="loading-container" style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--base-500, #141313)',
            zIndex: 9999,
        }}>
            <div className="loading-spinner" style={{
                width: '50px',
                height: '50px',
                border: '3px solid rgba(255, 255, 255, 0.1)',
                borderTop: '3px solid var(--base-100, #f2ede6)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
            }} />
            <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}
