/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = `worker hii ${data}`;
  postMessage(response);
});
