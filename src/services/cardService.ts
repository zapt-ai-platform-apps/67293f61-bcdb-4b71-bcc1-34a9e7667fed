/**
 * Simulates connecting a payment card to the finance tracker
 * This would typically involve real API calls to a payment processor
 * @param onSuccess - Callback for successful connection
 * @param onError - Callback for connection error
 * @returns A promise that resolves when connection completes
 */
export function connectCard(
  onSuccess: () => void,
  onError: (error: Error) => void
): Promise<void> {
  console.log('Connecting card...');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        console.log('Card connected successfully');
        onSuccess();
        resolve();
      } catch (error) {
        console.error('Error connecting card:', error);
        onError(error instanceof Error ? error : new Error('Unknown error connecting card'));
        resolve();
      }
    }, 2000);
  });
}