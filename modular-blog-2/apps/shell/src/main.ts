async function initMocks() {
  // Always initialize mocks in development
  const { worker } = await import('./mocks/browser');
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

initMocks().then(() => {
  import('./bootstrap').catch((err) => console.error(err));
});
