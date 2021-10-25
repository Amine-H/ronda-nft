import { useState, useEffect, useCallback } from 'react'
import { useWeb3React } from "@web3-react/core"
import Ronda from './Ronda.json'

const useRonda = () => {
  const { library } = useWeb3React()
  const contractAddress = '0x401512582e2E45770f34DabC7583EEf1c9E4C840'
  const [contract, setContract] = useState(undefined)

  useEffect(() => {
    if (library) {
      setContract(new library.eth.Contract(Ronda.abi, contractAddress))
    }
  }, [library])

  return contract
}


export const useAllTokens = () => {
  const ronda = useRonda()
  // const [isLoading, setLoading] = useState(false)
  const [tokens, setTokens] = useState(undefined)

  console.log(ronda)

  useEffect(() => {
    if (tokens || !ronda) {
      return
    }
    (async () => {
      const totalSupply = parseInt(await ronda.methods.totalSupply().call())
      const tokens = await Promise.all([...new Array(totalSupply)].map((_, tokenId) => getToken(ronda, tokenId + 1)))
      setTokens(tokens)
    })()
  }, [ronda, tokens])

  return tokens
}

export const getToken = async (ronda, tokenId) => {
  const tokenData = await ronda.methods.get(tokenId).call()
  const owner = await ronda.methods.ownerOf(tokenId).call()

  return {
    tokenId: tokenId,
    owner: owner,
    number: tokenData['_number'],
    type: tokenData['_type'],
  }
}


export const useMint = () => {
  const ronda = useRonda()
  const { account, library } = useWeb3React()

  const mint = useCallback((amount) => {
    if (!ronda || !account) {
      console.log('Cannot mint yet')
      return
    }


    const pricePerMint = 0.03
    const payableAmount = pricePerMint * amount

    ronda.methods.publicMint(amount).send({ from: account, value: library.utils.toWei(`${payableAmount}`, 'ether') })
  },
    [ronda, account, library],
  )

  return mint
}

export const useTokenDetails = (tokenId) => {
  const ronda = useRonda()
  const [tokenDetails, setTokenDetails] = useState(undefined)

  useEffect(() => {
    if (!ronda) {
      return
    }
    (async () => {
      const tokenURI = await ronda.methods.tokenURI(tokenId).call()
      const data = await fetch(tokenURI).then((response) => response.json())
      setTokenDetails(data)
    })()
  }, [ronda, tokenId])

  return tokenDetails
}
