"use client";

import { Component, ErrorInfo, ReactNode } from "react";

/**
 * Error boundary.
 *
 * QA walk principle: no uncaught crashes — if a section throws, the rest of
 * the page keeps working and the user sees a graceful fallback instead of a
 * blank screen.
 */
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="rounded-xl border border-warning/35 bg-warning-soft p-6 text-warning">
            <h3 className="font-semibold text-foreground">Something went wrong.</h3>
            <p className="mt-1 text-sm text-muted">
              This section failed to load. The rest of the page is unaffected.
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
