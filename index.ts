import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as flags from 'https://deno.land/std/flags/mod.ts';
import { SmtpClient } from 'https://deno.land/x/smtp/mod.ts';
// import 'https://deno.land/x/dotenv/load.ts';

const { args, exit } = Deno;
const DEFAULT_PORT = 8000;
const argPort = flags.parse(args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;
if (isNaN(port)){
    console.log("This is not port number");
    exit(1);
};

const app = new Application();
const router = new Router();

router.get('/', async ctx => {
    const reqBody = ctx.request.body({ type: 'json' });
    const { name, email, message } = await reqBody.value;
    console.log(name, email, message);
    ctx.response.body = 'Success!'; 
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port });
