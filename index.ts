import { Application } from "https://deno.land/x/oak/mod.ts";
import { parse } from 'https://deno.land/std/flags/mod.ts';
import { SmtpClient } from 'https://deno.land/x/smtp/mod.ts';
import 'https://deno.land/x/dotenv/load.ts';

const { args } = Deno;
const DEFAULT_PORT = 8000;
const argPort = parse(args).port;

const client = new SmtpClient();
const { SEND_EMAIL, PWD, RECV_EMAIL } = Deno.env.toObject();
const connectConfig: any = {
    hostname: "smtp.gmail.com",
    port: 465,
    username: SEND_EMAIL,
    password: PWD,
};

const app = new Application();

// send email
app.use(async ctx => {
    const reqBody = ctx.request.body({ type: 'json' });
    const { name, email, message } = await reqBody.value;
    console.log(name, email, message);
});

await app.listen({ port: argPort ? Number(argPort) : DEFAULT_PORT });
