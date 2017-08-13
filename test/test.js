var test = require('test');
test.setup();

describe("fiw-demo", () => {

  before(() => {
    console.debug('before test ...')
  })
  
  after(() => {
    console.debug('after test ...')
  });

  it('test fiw-demo', () => {
    //TODO

    assert.equal(1, 1)
  })

})

test.run(console.DEBUG);