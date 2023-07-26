const request = require('supertest');
const app = require('./app');

// beforeEach(() => {
//     // Clear the testItem from the shopping list before each test
//     app.locals.items = [testItem];
//   });

describe('Shopping List API', () => {
  let testItem;

  it('should add a new item to the shopping list', async () => {
    const newItem = { name: 'apple', price: 1.0 };
    const response = await request(app).post('/items').send(newItem);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ added: newItem });
    testItem = newItem;
  });

  it('should get the list of shopping items', async () => {
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([testItem]);
  });

  it('should get a single item by name', async () => {
    const response = await request(app).get(`/items/${testItem.name}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(testItem);
  });

  it('should update an existing item', async () => {
    const updatedItem = { name: 'apple', price: 1.5 }; 
    const response = await request(app)
      .patch(`/items/${testItem.name}`)
      .send(updatedItem);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ updated: updatedItem });
  });

  it('should delete an item from the shopping list', async () => {
    const response = await request(app).delete(`/items/${testItem.name}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Deleted' });
  });

  it('should return 404 when getting a non-existent item', async () => {
    const response = await request(app).get('/items/nonexistent');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Item not found' });
  });

  it('should return 404 when updating a non-existent item', async () => {
    const response = await request(app)
      .patch('/items/nonexistent')
      .send({ name: 'test', price: 1.0 });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Item not found' });
  });

  it('should return 404 when deleting a non-existent item', async () => {
    const response = await request(app).delete('/items/nonexistent');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Item not found' });
  });
});
