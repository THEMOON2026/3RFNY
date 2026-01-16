export default {
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname;

    if (path === '/') {
      path = '/index.html';
    }

    return new Response('File not found', { status: 404 });
  },
};
