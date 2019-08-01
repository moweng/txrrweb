import pako from 'pako';
export function unzip(b64Data){
    var strData   = atob(b64Data);
    // Convert binary string to character-number array
    var charData  = strData.split('').map(function(x){return x.charCodeAt(0);});
    // Turn number array into byte-array
    var binData   = new Uint8Array(charData);
    // // unzip
    var data    = pako.inflate(binData);
    // Convert gunzipped byteArray back to ascii string:
    // strData   = String.fromCharCode.apply(null, new Uint16Array(data));
    strData = handleCodePoints(new Uint16Array(data));
    return decodeURIComponent(strData);
}

function handleCodePoints(array) {
    var CHUNK_SIZE = 0x8000; // arbitrary number here, not too small, not too big
    var index = 0;
    var length = array.length;
    var result = '';
    var slice;
    while (index < length) {
      slice = array.slice(index, Math.min(index + CHUNK_SIZE, length)); // `Math.min` is not really necessary here I think
      result += String.fromCharCode.apply(null, slice);
      index += CHUNK_SIZE;
    }
    return result;
  }

export function zip(str){
    var binaryString = pako.gzip(encodeURIComponent(str), { to: 'string' });
    //console.log('binaryString:', binaryString);
    return btoa(binaryString);
}