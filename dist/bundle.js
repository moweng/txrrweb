import TxWorker from './txworker';


const init = function() {
    console.log('哈哈哈哈');
    const worker = new TxWorker();
    console.log('worker:', worker);
    worker.postMessage('哈哈哈');
};


// export const init = function() {
//     console.log('呵呵呵')
// }

//export default { init: init }

export { init };
