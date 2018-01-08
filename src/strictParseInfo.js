const Parsed=require("./parsed.js");
const ParseInfo=require("./parseInfo.js");
const InvalidKeyError=require("./errors/invalidKeyError.js");

const contains=function(list,key,caseSensitive) {
  return list.find(function(validKey){
    return key==validKey;
  });
}

var StrictParseInfo=function(initialParsingFunction,validKeys,caseSensitive) {
  ParseInfo.call(this,initialParsingFunction);
  this.validKeys=validKeys;
  this.caseSensitive= caseSensitive;
}

StrictParseInfo.prototype=Object.create(ParseInfo.prototype);


StrictParseInfo.prototype.pushKeyValuePair=function() {
  if (this.caseSensitive==false) {
    this.currentKey = this.currentKey.toLowerCase();
  }
  if(!contains(this.validKeys,this.currentKey,this.caseSensitive))
    throw new InvalidKeyError("invalid key",this.currentKey,this.currentPos);
    if (this.caseSensitive=="false") {
      this.currentKey = this.currentKey.toLowerCase();
    }
  this.parsedKeys[this.currentKey]=this.currentValue;
  this.resetKeysAndValues();
}

module.exports=StrictParseInfo;
