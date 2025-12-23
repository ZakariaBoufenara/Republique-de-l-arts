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
        </div>
    );
}
