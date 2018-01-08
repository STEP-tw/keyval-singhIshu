const Parsed=require("./parsed.js");
const ParseInfo=require("./parseInfo.js");
const InvalidKeyError=require("./errors/invalidKeyError.js");

const contains=function(list,key) {
  return list.find(function(validKey){
    return key==validKey;
  });
}


var StrictParseInfo=function(initialParsingFunction,validKeys,caseSensitive) {
  ParseInfo.call(this,initialParsingFunction);
  this.validKeys=validKeys;
  this.caseSensitive= caseSensitive;
}

const isCaseInsensitive = function(caseSensitive) {
  return !caseSensitive;
}

const convertKeyIntoLowerCase = function(validKey) {
  return validKey.toLowerCase();
}

StrictParseInfo.prototype=Object.create(ParseInfo.prototype);


StrictParseInfo.prototype.pushKeyValuePair=function() {
  let validKeys = this.validKeys;
  let currentKey = this.currentKey;
  if (!this.caseSensitive) {
    validKeys = this.validKeys.map(convertKeyIntoLowerCase);
    currentKey = this.currentKey.toLowerCase();
  }
  if(!contains(validKeys,currentKey))
    throw new InvalidKeyError("invalid key",this.currentKey,this.currentPos);
  this.parsedKeys[this.currentKey]=this.currentValue;
  this.resetKeysAndValues();
}

module.exports=StrictParseInfo;
