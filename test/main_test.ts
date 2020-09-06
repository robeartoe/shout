import app  from '../main.ts';
import { superoak } from "https://deno.land/x/superoak@2.1.0/mod.ts";
import {
  assertEquals,
  fail,
} from 'https://deno.land/std/testing/asserts.ts';
// import axiosd from 'https://deno.land/x/axiod/mod.ts';

// const hostname = 'localhost';
// const port = 8080;
// const httpUrl = `http://${hostname}:${port}`;

// const abortController: AbortController;

// async function startServer() {
//   abortController = new AbortController();
//   console.log('Starting test server');
//   try {
//     listenPromise = new OakServer(hostname, port).start(abortController.signal);
//     listenPromise = 
//   } catch (err) {
//     console.error(`Server can't start : ${err}`);
//   }
// }

// function stopServer() {
//   abortController.abort();
//   await listenPromise;
//   console.log('server stop');
// }

// function afterAll() {
//   stopServer();
// }

// async function beforeAll() {
//   await startServer();
// }

Deno.test('test', async () => {
  const test = 1 + 3;
  assertEquals(test, 4);
});

// Deno.test('Get all user', async () => {
//   await beforeAll();
//   const response = await axiosd.get(`${httpUrl}/users`);
//   const users = response.data.data;

//   assertEquals(response.status, 200);
//   assertEquals(users.length, 2);
//   assertEquals(users[0]['id'], '1');
//   assertEquals(users[0]['name'], 'Bob');
//   assertEquals(users[1]['id'], '2');
//   assertEquals(users[1]['name'], 'Alice');

//   afterAll();
// });
