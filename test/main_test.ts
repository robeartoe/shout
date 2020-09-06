import {superoak} from 'https://deno.land/x/superoak@2.1.0/mod.ts';

Deno.test('Ensure only POST methods is allowed', async () => {
  const request = await superoak('http://localhost:8080');
  await request.get('/').expect(405);
  await request.put('/').expect(405);
  await request.delete('/').expect(405);
});

Deno.test('Should return 400 if no body is provided', async () => {
  const request = await superoak('http://localhost:8080');
  await request.post('/').expect(400);
});


// Deno.test('Shout Service Various Cases:', async () => {
//   const request = await superoak('http://localhost:8080');
//   await request.post('/');
// });
