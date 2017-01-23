let hexString = "0123456789abcdef";

export default class Generate {

    static randomHexString(length) {
        let bytes = "";
        for(let i = 0; i<length; i++) {
            bytes += hexString.substr(Math.floor(Math.random()*hexString.length),1);
        }
        return bytes;
    }
    
    static UUID () {
        return `${Generate.randomHexString(7)}-${Generate.randomHexString(4)}-${Generate.randomHexString(4)}-${Generate.randomHexString(4)}-${Generate.randomHexString(4)}-${Generate.randomHexString(12)}`
    }
    
}
