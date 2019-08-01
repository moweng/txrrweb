// self.importScripts('./jsencrypt.min.js');
// self.importScripts('./crypto.js');




self.addEventListener('message', function (e) {

    // if(result && result.length > 0) {
    //     fetch('http://localhost:8080/add', {
    //         method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //         headers:{
    //             'Content-Type': 'application/json'
    //          },
    //          body: JSON.stringify(params)
    //     })
    //     .then(response => response.json())
    //     .then(resp => {
    //         debugger;
    //     }).catch(err => {
    //         this.console.log('err:', err);
    //     })
    // }
    self.saveDataToIndexedDB(e.data);

    
}, false);



const originKey = '0321ebeba1f75de2d3cd3471af7418a4';
const originIv = 'ABCDEF1234123412';


self.encryptData = function(data) {

    const message = JSON.stringify(data);
    const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDGk532lxwSs3EKGkkMQfPiKy/zgFY91iHVUDa2nTDnjhrtjI0b96eyfv/lrrk7QdHdANW+IBkOv80+EJZXE9yZ5wDtIN+2i3mKoANkiqW9UzhPNwerWuJDMCfww6vhPQnSoc7ojbtYEeAv1ZAwVJqtKdrhYIgRCHYrBAQljgkTHQIDAQAB';
    const privateKey = 'MIICXQIBAAKBgQDGk532lxwSs3EKGkkMQfPiKy/zgFY91iHVUDa2nTDnjhrtjI0b96eyfv/lrrk7QdHdANW+IBkOv80+EJZXE9yZ5wDtIN+2i3mKoANkiqW9UzhPNwerWuJDMCfww6vhPQnSoc7ojbtYEeAv1ZAwVJqtKdrhYIgRCHYrBAQljgkTHQIDAQABAoGBAIBm6WiO82cgQsK+lmdnqhSfymTQonNfqAbv1EEmyX2hBMZ/8KqZ7ATeXAefgETR3arjJFLJHIrN+R/dx+jMfgKd2m3gmE++OwS5lcuj6a2yUKQtQDrNH/euSmhszDK2vyKbyJCcNOSk4qngLAaRsyPNGkfmt/h16ITOEio6hwmhAkEA8tUtmQH818bBau/RTsTxrUfwK7Y8jg6T+JM6PKL4+zHbLxkzBcgGyto3bRJ5k21aJzY85Ar4wy2JSaHwBbJNtQJBANFYG+RBl+e+Pvw9ThoxBcNFpjbK9aU8SScTiixRteAgBxa45XlSdt87FyVVbxkG94L9cHkhcIGjvO1bndar0MkCQGHBnhSdrzryYYT6PEm4kQ5QCoieWWxaxAjqxCQK+66sGG+ydk7agpmBFZUMPfMyr3tfo02ueQyhtUX2Mhko+Y0CQCwAWAR3IQWtwDFmdVcd/LcZmaEksdMkQ7/55G4CUrckJDlLbbg9dAzhr7DCL1LUWwvmV1CujaZCE0DUo+1uObkCQQCDeBqyFzjUx7CDGlO2Iq+KVa246ridV5GJxIdPiAvN6g1//4hspSF2+dhPu4G0td1gqimLKuoNnufZE2gl28NF';
    const encryptedMessage =  self.encrypt(message, publicKey, privateKey);
    this.console.log('encryptedMessage:', encryptedMessage);
    const decryptedMessage = self.decrypt(encryptedMessage, publicKey, privateKey);
    this.console.log('decryptedMessage:', decryptedMessage);
    return encryptedMessage;
}


self.encrypt = function(word) {
    const key = CryptoJS.enc.Hex.parse(originKey);  //十六位十六进制数作为密钥
    const iv = CryptoJS.enc.Hex.parse(originIv); 
    this.console.time('encrypted time:');
    let encrypted = CryptoJS.AES.encrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    this.console.timeEnd('encrypted time:');
    var result = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    return result;

}

self.decrypt = function (word, publicKey, privateKey) {
    var encryptTool = new JSEncrypt();
    encryptTool.setPublicKey(publicKey);
    encryptTool.setPrivateKey(privateKey);
    const encryptKey = encryptTool.encrypt(originKey);
    const encryptIv = encryptTool.encrypt(originIv);

    this.console.log('encryptKey:', encryptKey);
    
    const decryptKey = encryptTool.decrypt(encryptKey);
    const decryptIv = encryptTool.decrypt(encryptIv);


    const key = CryptoJS.enc.Hex.parse(decryptKey);  //十六位十六进制数作为密钥
    const iv = CryptoJS.enc.Hex.parse(decryptIv); 


    let decrypt = CryptoJS.AES.decrypt({ciphertext: CryptoJS.enc.Base64.parse(word)}, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr;
}


self.saveDataToIndexedDB = async function(data) {
    // const result = await self.fetchDrcfromIndexedDB();
    // const params = {
    //     data: JSON.stringify(result),
    // }
    debugger;
    const result = self.encryptData(data.logData);
    
    const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDGk532lxwSs3EKGkkMQfPiKy/zgFY91iHVUDa2nTDnjhrtjI0b96eyfv/lrrk7QdHdANW+IBkOv80+EJZXE9yZ5wDtIN+2i3mKoANkiqW9UzhPNwerWuJDMCfww6vhPQnSoc7ojbtYEeAv1ZAwVJqtKdrhYIgRCHYrBAQljgkTHQIDAQAB';
    const privateKey = 'MIICXQIBAAKBgQDGk532lxwSs3EKGkkMQfPiKy/zgFY91iHVUDa2nTDnjhrtjI0b96eyfv/lrrk7QdHdANW+IBkOv80+EJZXE9yZ5wDtIN+2i3mKoANkiqW9UzhPNwerWuJDMCfww6vhPQnSoc7ojbtYEeAv1ZAwVJqtKdrhYIgRCHYrBAQljgkTHQIDAQABAoGBAIBm6WiO82cgQsK+lmdnqhSfymTQonNfqAbv1EEmyX2hBMZ/8KqZ7ATeXAefgETR3arjJFLJHIrN+R/dx+jMfgKd2m3gmE++OwS5lcuj6a2yUKQtQDrNH/euSmhszDK2vyKbyJCcNOSk4qngLAaRsyPNGkfmt/h16ITOEio6hwmhAkEA8tUtmQH818bBau/RTsTxrUfwK7Y8jg6T+JM6PKL4+zHbLxkzBcgGyto3bRJ5k21aJzY85Ar4wy2JSaHwBbJNtQJBANFYG+RBl+e+Pvw9ThoxBcNFpjbK9aU8SScTiixRteAgBxa45XlSdt87FyVVbxkG94L9cHkhcIGjvO1bndar0MkCQGHBnhSdrzryYYT6PEm4kQ5QCoieWWxaxAjqxCQK+66sGG+ydk7agpmBFZUMPfMyr3tfo02ueQyhtUX2Mhko+Y0CQCwAWAR3IQWtwDFmdVcd/LcZmaEksdMkQ7/55G4CUrckJDlLbbg9dAzhr7DCL1LUWwvmV1CujaZCE0DUo+1uObkCQQCDeBqyFzjUx7CDGlO2Iq+KVa246ridV5GJxIdPiAvN6g1//4hspSF2+dhPu4G0td1gqimLKuoNnufZE2gl28NF';
    var encryptTool = new JSEncrypt();
    encryptTool.setPublicKey(publicKey);
    encryptTool.setPrivateKey(privateKey);
    const encryptKey = encryptTool.encrypt(originKey);
    const encryptIv = encryptTool.encrypt(originIv);
    await self.init();
    const logData = {
        id: `s1-${new Date().getTime()}`,
        s1: encryptKey,
        s2: encryptIv,
        data: result,
    }
    const records = await self.fetchDrcfromIndexedDB();
    // if(records && records.length >= 5) {
    //     await this.saveToBackward(records);
    //     self.add(logData);
    // }else {
    //     self.add(logData);
    // }

    self.add(logData);

}


self.fetchDrcfromIndexedDB = function () {
    return new Promise(async (resolve, resject) => {
        if(!self.db) {
            self.init().then(async () => {
                const result = await self.read();
                resolve(result);
            })
        }else {
            const result = await self.read();
            resolve(result);
        }
    })
}

self.read = async function() {
    let vm = self;
    return new Promise((resolve, reject) => {
        var result = [];
        var transaction = vm.db.transaction(['log']);
        var objectStore = transaction.objectStore('log', 'read');
        var request = objectStore.openCursor();
        request.onerror = function() {
            reject('读取事务失败');
            console.log('读取事务失败');
        }

        request.onsuccess = function(event) {
            var cursor = event.target.result;
            if(cursor) {

                console.log('logId', cursor.value);
                result.push(cursor.value);
                // console.log('logDetail', request.result.logDetail);
                cursor.continue();
            }else {
                resolve(result);
            }
        }
    })
    
}

self.add = function(data) {
    return new Promise((resolve, reject) => {
       var addRequest = self.db.transaction(['log'], 'readwrite')
           .objectStore('log').add(data)
       addRequest.onsuccess = function() {
           console.log('数据写入成功');
           resolve('数据写入成功')
       }

       addRequest.onerror = function(event) {
           console.log('数据写入失败');
           reject('数据写入失败');
       }
    });
   
}



self.init = function() {
    return new Promise((resolve, reject) => {
       var request = self.indexedDB.open('log', 1);
       request.onerror = function(event) {
           console.log('数据库打开失败');
           reject('数据库打开失败');
       }
       request.onsuccess = function(event) {
           self.db = request.result;
           console.log('数据库打开成功');
           resolve('数据库打开成功');
       }

       request.onupgradeneeded = function(event) {

           self.db = event.target.result;
           var objectStore;
           if(!self.db.objectStoreNames.contains('log')) {
               objectStore = self.db.createObjectStore('log', {keyPath: 'id'});
               objectStore.createIndex('s1', 's1', { unique: false });
               objectStore.createIndex('s2', 's2', { unique: false });
               objectStore.createIndex('time', 'time', { unique: false });
               objectStore.createIndex('userId', 'userId', { unique: false });
               objectStore.createIndex('event', 'event', { unique: false });
               resolve('数据库打开成功');
           }else {
               reject('数据库打开失败');
           }
       }
    })
}


self.saveToBackward = async function(result) {
  
    return new Promise((resolve, reject) => {
        self.isSaving = true;
        const params = {
            data: result,
        }
        this.console.log('result:', JSON.stringify(params));
        fetch('http://localhost:8080/add', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers:{
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(result[0]),
        })
        .then(response => response.json())
        .then(async (resp) => {
            this.console.log('hasSavedData:', resp);
            const result = await self.removeSavedDataFromeIndexsDB(resp);
            resolve(result);
        }).catch(err => {
            this.console.log('err:', err);
            reject(err);
        })
    })       
}

self.removeSavedDataFromeIndexsDB = function(data) {
    
    return new Promise((resolve, reject) => {
        var objectStore = self.db.transaction(['log'], "readwrite").objectStore('log');   
        const request = objectStore.clear();
        request.onsuccess = function() {
           resolve({status: 'ok'})
        };

        self.onerror = function() {
            reject({status: 'error'})
        }
    });
}



// setInterval(function() {
//     if(!self.isSaving) {
//         self.save();
//     }
// }, 3000)