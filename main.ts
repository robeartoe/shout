import app from './server.ts';
import "https://deno.land/x/dotenv/mod.ts";
const PORT = Deno?.env?.get('PORT') ?? 8080;

await app.listen({port: Number(PORT)});
