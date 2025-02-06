"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
console.log(`Worker thread ${worker_threads_1.workerData.request} started`);
for (let i = 0; i < worker_threads_1.workerData.iterations; i++) {
    for (let count = 0; count < worker_threads_1.workerData.total; count++) {
        count++;
    }
    worker_threads_1.parentPort?.postMessage(i);
}
console.log(`Worker thread ${worker_threads_1.workerData.request} finished`);
