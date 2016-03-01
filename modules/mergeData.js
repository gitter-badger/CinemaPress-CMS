'use strict';

function mergeObject(json1, json2){
    var out = {};
    for(var k1 in json1){
        if (json1.hasOwnProperty(k1)) out[k1] = json1[k1];
    }
    for(var k2 in json2){
        if (json2.hasOwnProperty(k2)) {
            if(!out.hasOwnProperty(k2)) out[k2] = json2[k2];
            else if(
                (typeof out[k2] === 'object') && (out[k2].constructor === Object) &&
                (typeof json2[k2] === 'object') && (json2[k2].constructor === Object)
            ) out[k2] = mergeObject(out[k2], json2[k2]);
        }
    }
    return out;
}

module.exports = mergeObject;