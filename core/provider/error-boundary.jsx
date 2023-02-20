import React from "react";

export class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        if (process.env.REACT_APP_ENVIRONMENT === "production") {
            // TODO: report to some analytics tools like Sentry
        }
    }

    render() {
        if (!this.state.hasError) {
            return this.props.children;
        }

        return (
            <div>
                <h1>An error has occurred, please refresh this page. Contact HomeBreeze if a refresh does not resolve.</h1>
            </div>
        );
    }  
}
