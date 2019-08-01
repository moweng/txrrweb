
import TxWorker from 'web-worker:./txworker';
import * as rrweb from 'rrweb';
import { formateDate } from './date';

import { zip } from './zip';



export const init = function() {
    
}

export default class TxRRweb {

    init() {
        this.events = [];
        console.log('哈哈哈哈');
        this.worker = new TxWorker();
        console.log('worker:', this.worker);
        this.startRecord();
    }

    startRecord() {
        console.log('rrweb:', rrweb);
        const vm = this;
        rrweb.record({
            emit(event, checkout) {
                // 用任意方式存储 event
                console.log('event:', vm.events);
                vm.events.push(event);
                console.log('isCheckout:', checkout);
                if(checkout) {
                    vm.save();
                }
            },
            checkoutEveryNms: 1000 * 30 * 1,
        });
    }

    save() {
        console.time('compressData:');
        var compressData = JSON.stringify(this.events);
        console.timeEnd('compressData:')
        console.time('compress time:');
        
       // const result = unzip(compressData);
        const logData = {id: new Date().getTime(), system: '123', logDetail: compressData, creator: '默翁', createTime: new Date().getTime()};

        this.worker.postMessage({
            secretKey: this.secretKey, 
            publicKey: this.publicKey, 
            event: compressData, 
            createTime: new Date().getTime(),
            userId: '123456',
            appId: '123456',
        });
        //indexDB.add({id: new Date().getTime(), system: '123', logDetail: compressData, creator: '默翁', createTime: formateDate(new Date(), "yyyy-MM-dd hh:mm:ss")});
        //
        var localStorage = window.localStorage;
        this.events = [];
    }
    
    
}


// export const init = function() {
//     console.log('呵呵呵')
// }

//export default { init: init }