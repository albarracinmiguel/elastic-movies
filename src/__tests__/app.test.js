const request = require('supertest');
const createApp = require('../app');

describe('movies API', () => {
  let app;
  let client;

  beforeEach(() => {
    client = {
      index: jest.fn(),
      get: jest.fn(),
      search: jest.fn(),
    };
    app = createApp(client);
  });

  test('POST /movies indexes a movie', async () => {
    client.index.mockResolvedValue({ body: { result: 'created' } });
    await request(app)
      .post('/movies')
      .send({ title: 'test' })
      .expect(201, { result: 'created' });
    expect(client.index).toHaveBeenCalled();
  });

  test('GET /movies/:id retrieves a movie', async () => {
    client.get.mockResolvedValue({ body: { _source: { title: 'hello' } } });
    await request(app)
      .get('/movies/1')
      .expect(200, { title: 'hello' });
    expect(client.get).toHaveBeenCalledWith({ index: 'movies', id: '1' });
  });

  test('GET /search queries movies', async () => {
    client.search.mockResolvedValue({ body: { hits: { hits: [{ _id: '1', _source: { title: 't' } }] } } });
    await request(app)
      .get('/search?q=t')
      .expect(200, [{ id: '1', title: 't' }]);
    expect(client.search).toHaveBeenCalled();
  });
});

