import {  setTimeout } from 'timers/promises';

async function * myCustomReadable() {
    yield Buffer.from("This is my");

    await setTimeout(100);

    yield Buffer.from("This is my 2");
}