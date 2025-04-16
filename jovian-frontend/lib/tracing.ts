import { trace, context, SpanStatusCode } from '@opentelemetry/api';

// Get the tracer for your service
const tracer = trace.getTracer('jovian-game-server');

/**
 * Create a custom span for a function
 * @param name The name of the span
 * @param fn The function to trace
 * @param attributes Optional attributes to add to the span
 */
export async function createSpan<T>(
  name: string,
  fn: () => Promise<T> | T,
  attributes: Record<string, string | number | boolean> = {}
): Promise<T> {
  return await tracer.startActiveSpan(name, async (span) => {
    try {
      // Add attributes to the span
      Object.entries(attributes).forEach(([key, value]) => {
        span.setAttribute(key, value);
      });
      
      // Execute the function
      const result = await fn();
      
      // End the span
      span.setStatus({ code: SpanStatusCode.OK });
      span.end();
      
      return result;
    } catch (error) {
      // Record the error
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : String(error),
      });
      
      // Record the stack trace if available
      if (error instanceof Error && error.stack) {
        span.recordException(error);
      }
      
      span.end();
      throw error;
    }
  });
}

/**
 * Create a custom span for a function with context propagation
 * @param name The name of the span
 * @param parentContext The parent context
 * @param fn The function to trace
 * @param attributes Optional attributes to add to the span
 */
export async function createSpanWithContext<T>(
  name: string,
  parentContext: any,
  fn: () => Promise<T> | T,
  attributes: Record<string, string | number | boolean> = {}
): Promise<T> {
  return await context.with(parentContext, async () => {
    return createSpan(name, fn, attributes);
  });
}
