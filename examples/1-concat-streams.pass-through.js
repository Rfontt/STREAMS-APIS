import { Writable, Readable } from 'stream';
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
        const data = chunck.toString();

        console.log(data);

        cb();
    }
});

results[0].pipe(output)