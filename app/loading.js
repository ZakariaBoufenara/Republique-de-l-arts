export default function Loading() {
    return (
        <div className="loading-container">
            {/* Navbar Skeleton */}
            <div className="skeleton-nav">
                <div className="skeleton-logo"></div>
                <div className="skeleton-links"></div>
            </div>

            {/* Hero Skeleton */}
            <div className="skeleton-hero">
                <div className="skeleton-hero-content">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-subtitle"></div>
                    <div className="skeleton-buttons"></div>
                </div>
            </div>

            <style jsx>{`
                .loading-container {
                    width: 100vw;
                    height: 100vh;
                    background-color: #FAF9F6;
                    position: relative;
                    overflow: hidden;
                }

                /* Shimmer Effect */
                .skeleton-logo, .skeleton-links, 
                .skeleton-title, .skeleton-subtitle, .skeleton-buttons {
                    background: linear-gradient(
                        90deg,
                        rgba(200, 200, 200, 0.2) 0%,
                        rgba(200, 200, 200, 0.4) 50%,
                        rgba(200, 200, 200, 0.2) 100%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                    border-radius: 8px;
                }

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                .skeleton-nav {
                    display: flex;
                    justify-content: space-between;
                    padding: 24px 5%;
                    align-items: center;
                }

                .skeleton-logo {
                    width: 150px;
                    height: 50px;
                }

                .skeleton-links {
                    width: 400px;
                    height: 30px;
                }

                .skeleton-hero {
                    height: 80vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 5%;
                }

                .skeleton-hero-content {
                    width: 100%;
                    max-width: 800px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                }

                .skeleton-title {
                    width: 80%;
                    height: 60px;
                }

                .skeleton-subtitle {
                    width: 60%;
                    height: 20px;
                }

                .skeleton-buttons {
                    width: 300px;
                    height: 50px;
                    margin-top: 1rem;
                }

                @media (max-width: 768px) {
                    .skeleton-links { display: none; }
                    .skeleton-title { width: 90%; height: 40px; }
                }
            `}</style>
        </div>
    );
}
