const Ronda = artifacts.require('./Ronda.sol')
require('chai')
  .use(require('chai-as-promised'))
  .should()


contract('Ronda', (accounts) => {
  let contract = null

  before(async () => {
    contract = await Ronda.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const contractAddress = contract.address

      assert.notEqual(contractAddress, '')
      assert.notEqual(contractAddress, 0x0)
      assert.notEqual(contractAddress, null)
      assert.notEqual(contractAddress, undefined)
    })

    it('has name', async () => {
      const name = await contract.name()

      assert.equal(name, 'Ronda')
    })

    it('has symbol', async () => {
      const symbol = await contract.symbol()

      assert.equal(symbol, 'RNDA')
    })
  })
})

