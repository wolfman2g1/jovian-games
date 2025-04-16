export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Only run instrumentation in Node.js environment
    const { setupOpenTelemetry } = await import('./instrumentation/opentelemetry');
    setupOpenTelemetry();
  }
}

export const runtime = 'nodejs';
