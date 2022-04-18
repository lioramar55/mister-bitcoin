import axios from 'axios'

const cacheKey = 'caching'
let cache = localStorage.getItem(cacheKey)
cache = cache ? JSON.parse(cache) : {}

export async function getRate(balance) {
  if (cache[balance]) {
    console.log('return from cache for balance ', balance)
    return cache[balance]
  }
  const url = `https://blockchain.info/tobtc?currency=USD&value=${balance}`
  const res = await axios.get(url)
  cache[balance] = res.data
  localStorage.setItem(cacheKey, JSON.stringify(cache))
  return res.data
}

export async function getMarketPrice(timeSpan = '6months') {
  if (cache[timeSpan]) {
    console.log(
      'returning from cache data about bitcoin for timespan of ' +
        timeSpan
    )
    return cache[timeSpan]
  }
  const url = `https://api.blockchain.info/charts/market-price?timespan=${timeSpan}&format=json&cors=true`
  const res = await axios.get(url)
  return res.data.values
}

export async function getConfirmedTransactions() {}
