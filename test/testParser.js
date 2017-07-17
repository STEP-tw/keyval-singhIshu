const assert=require('assert');
const Parser=require('../src/keyValueParser.js');

var kvParser;


describe("parse basic key values",function(){
  beforeEach(function(){
    kvParser=new Parser();
  });

  it("parse key=value",function(){
    var expected={numberOfKeys:1,keys:{key:"value"}};
    assert.deepEqual(expected,kvParser.parse("key=value"));
  });

  it("parse when there are leading spaces before key",function(){
    var expected={numberOfKeys:1,keys:{key:"value"}};
    assert.deepEqual(expected,kvParser.parse(" key=value"));
  });

  it("parse when there are spaces after key",function(){
    var expected={numberOfKeys:1,keys:{key:"value"}};
    assert.deepEqual(expected,kvParser.parse("key =value"));
  });

  it("parse when there are spaces before and after key",function(){
    var expected={numberOfKeys:1,keys:{key:"value"}};
    assert.deepEqual(expected,kvParser.parse(" key =value"));
  });

  it("parse when there are spaces before value",function(){
    var expected={numberOfKeys:1,keys:{key:"value"}};
    assert.deepEqual(expected,kvParser.parse("key= value"));
  });

  it("parse when there are spaces after value",function(){
    var expected={numberOfKeys:1,keys:{key:"value"}};
    assert.deepEqual(expected,kvParser.parse("key=value "));
  });
});

describe("multiple keys",function(){
  beforeEach(function(){
    kvParser=new Parser();
  });

  it("parse more than one key",function(){
    var expected={numberOfKeys:2,keys:{key:"value",anotherkey:"anothervalue"}};
    assert.deepEqual(expected,kvParser.parse("key=value anotherkey=anothervalue"));
  });

  it("parse more than one key when keys have leading spaces",function(){
    var expected={numberOfKeys:2,keys:{key:"value",anotherkey:"anothervalue"}};
    assert.deepEqual(expected,kvParser.parse("   key=value anotherkey=anothervalue"));
  });

  it("parse more than one key when keys have trailing spaces",function(){
    var expected={numberOfKeys:2,keys:{key:"value",anotherkey:"anothervalue"}};
    assert.deepEqual(expected,kvParser.parse("key  =value anotherkey  =anothervalue"));
  });

  it("parse more than one key when keys have leading and trailing spaces",function(){
    var expected={numberOfKeys:2,keys:{key:"value",anotherkey:"anothervalue"}};
    assert.deepEqual(expected,kvParser.parse("  key  =value anotherkey  =anothervalue"));
  });
});

describe("single values with quotes",function(){
  beforeEach(function(){
    kvParser=new Parser();
  });

  it("parse a single value with quotes",function(){
    var expected={numberOfKeys:1,keys:{key:"value"}};
    assert.deepEqual(expected,kvParser.parse("key=\"value\""));
  });

  it("parse a single quoted value that has spaces in it",function(){
    var expected={numberOfKeys:1,keys:{key:"va lue"}};
    assert.deepEqual(expected,kvParser.parse("key=\"va lue\""));
  });

  it("parse a single quoted value that has spaces in it and leading spaces",function(){
    var expected={numberOfKeys:1,keys:{key:"va lue"}};
    assert.deepEqual(expected,kvParser.parse("key=   \"va lue\""));
  });

  it("parse a single quoted value that has spaces in it and trailing spaces",function(){
    var expected={numberOfKeys:1,keys:{key:"va lue"}};
    assert.deepEqual(expected,kvParser.parse("key=\"va lue\"   "));
  });
});

describe("multiple values with quotes",function(){
  it("parse more than one value with quotes",function(){
    var expected={numberOfKeys:2,keys:{key:"va lue",anotherkey:"another value"}};
    assert.deepEqual(expected,kvParser.parse("key=\"va lue\" anotherkey=\"another value\""));
  });

  it("parse more than one value with quotes with leading spaces",function(){
    var expected={numberOfKeys:2,keys:{key:"va lue",anotherkey:"another value"}};
    assert.deepEqual(expected,kvParser.parse("key= \"va lue\" anotherkey= \"another value\""));
  });

  it("parse more than one value with quotes when keys have trailing spaces",function(){
    var expected={numberOfKeys:2,keys:{key:"va lue",anotherkey:"another value"}};
    assert.deepEqual(expected,kvParser.parse("key = \"va lue\" anotherkey = \"another value\""));
  });
});

describe("mixed values with both quotes and without",function(){
  it("parse simple values with and without quotes",function(){
    var expected={numberOfKeys:2,keys:{key:"value",anotherkey:"anothervalue"}};
    assert.deepEqual(expected,kvParser.parse("key=value anotherkey=\"anothervalue\""));
  });

  it("parse simple values with and without quotes and leading spaces on keys",function(){
    var expected={numberOfKeys:2,keys:{key:"value",anotherkey:"anothervalue"}};
    assert.deepEqual(expected,kvParser.parse("   key=value anotherkey=\"anothervalue\""));
  });

  it("parse simple values with and without quotes and trailing spaces on keys",function(){
    var expected={numberOfKeys:2,keys:{key:"value",anotherkey:"anothervalue"}};
    assert.deepEqual(expected,kvParser.parse("key  =value anotherkey  =\"anothervalue\""));
  });

  it("parse simple values with and without quotes and leading and trailing spaces on keys",function(){
    var expected={numberOfKeys:2,keys:{key:"value",anotherkey:"anothervalue"}};
    assert.deepEqual(expected,kvParser.parse("  key  =value anotherkey  = \"anothervalue\""));
  });

  it("parse simple values with and without quotes(quoted values first)",function(){
    var expected={numberOfKeys:2,keys:{key:"value",anotherkey:"anothervalue"}};
    assert.deepEqual(expected,kvParser.parse("anotherkey=\"anothervalue\" key=value"));
  });
});