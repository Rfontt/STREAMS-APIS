import http from 'http';
import { Readable } from 'stream';

function app1(request, response) {
    // response.write('Test01 \n');
    // response.write('Test02 \n');
    // response.write('Test03 \n');

    // request.pipe(response);

    let count = 0;
    const maxItems = 90;

    const readable = Readable({
        read() {
            const everySecond = (intervalContext) => {
                if (count++ <= maxItems) {
                    this.push(
                        JSON.stringify({ 
                            id: Date.now() + count, name: `Rfontt - ${count}`
                        }) + "\n"
                    );
    
                    return;
                }
    
                clearInterval(intervalContext);
    
                this.push(null);
            }
    
            setInterval(function() {
                everySecond(this);
            })
        }
    });

    readable.pipe(response);
}

function app2(request, response) {
    let count = 0;
    const maxItems = 90;
    
    const readable = Readable({
        read() {
            const everySecond = (intervalContext) => {
                if (count++ <= maxItems) {
                    this.push(
                        JSON.stringify({ 
                            id: Date.now() + count, name: `Liam - ${count}`
                        }) + "\n"
                    );
    
                    return;
                }
    
                clearInterval(intervalContext);
    
                this.push(null);
            }
    
            setInterval(function() {
                everySecond(this);
            })
        }
    });

    readable.pipe(response);
}

http.createServer(app1).listen(3000, () => console.log('Server running at 3000'));
http.createServer(app2).listen(4000, () => console.log('Server running at 4000'));