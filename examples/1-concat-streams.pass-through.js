import { PassThrough, Writable } from 'stream';
import axios from "axios";

const API_01 = 'http://localhost:3000';
const API_02 = 'http://localhost:4000';

const requests = await Promise.all([
    axios({
        method: 'get',
        url: API_01,
        responseType: 'stream'
    }),

    axios({
        method: 'get',
        url: API_02,
        responseType: 'stream'
    })
]);

const results = requests.map(({ data }) => data)

const output = Writable({
    write(chunck, encoding, cb) {
        const data = chunck.toString().replace(/\n/, "");

        // ?=- => it looks for "-"" and selects everything behind it
        // (?<name>.*) => It to find the content in quotation marks ("") and extract only the name
        const name = data.match(/:"(?<name>.*)(?=-)/);

        console.log(name)

        cb();
    }
});

function merge(streams) {
    return streams.reduce((prev, current, index, items) => {
        // it prevents stream from closing by itself
        current.pipe(prev, { end: false });
        current.on('end', () => items.every(
            s => s.ended 
        ) && prev.end());

        return prev;

    }, new PassThrough());
}

merge(results).pipe(output);

// merge(results).pipe(output);

// results[1].pipe(output)