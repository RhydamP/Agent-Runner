export function evaluateExpression(expression: string): string {
  try {
    // WARNING: Never use eval in production without proper sanitization.
    const result = Function('"use strict";return (' + expression + ')')();
    return result.toString();
  } catch {
    throw new Error('Invalid math expression.');
  }
}
