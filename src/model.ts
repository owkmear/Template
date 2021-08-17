import { StocksState } from './reducers/stocks'
import { GreedState } from './reducers/greed'
import { PredictionsState } from './reducers/predictions'
import { NewsState } from './reducers/news'
import { ChartsState } from './reducers/charts'

export type AppState = {
  stocks: StocksState
  greed: GreedState
  predictions: PredictionsState
  news: NewsState
  charts: ChartsState
}

export namespace Payload {
  export type UpdatePrediction = {
    newData: Prediction
    oldData: Prediction
  }
}

export namespace ServerAnswer {
  export type Stock = {
    data: {
      circulating_supply: number
      cmc_rank: number
      date_added: string
      id: number
      last_updated: string
      max_supply: number
      name: string
      num_market_pairs: number
      platform: string
      quote: {
        USD: {
          last_updated: string
          market_cap: number
          percent_change_1h: number
          percent_change_7d: number
          percent_change_24h: number
          price: number
          volume_24h: number
        }
      }
      slug: string
      symbol: string
      tags: string[]
      total_supply: number
    }[]
    status: {
      credit_count: number
      elapsed: number
      error_code: number
      error_message: string
      notice: string
      timestamp: string
      total_count: number
    }
  }

  export type Greed = {
    data: {
      time_until_update?: string
      timestamp: string
      value: string
      value_classification: GreedClassification
    }[]
    metadata: {
      error: string | null
    }
    name: string
  }

  export type News = {
    Data: {
      body: string
      categories: string
      downvotes: string
      guid: string
      id: string
      imageurl: string
      lang: string
      published_on: number
      source: string
      source_info: {
        img: string
        lang: string
        name: string
      }
      tags: string
      title: string
      upvotes: string
      url: string
    }[]
    HasWarning: boolean
    Message: string
    Promoted: object[]
    RateLimit: object
    Type: number
  }

  export type Coin = {
    Data: {
      id: number
      data_available_from: number
      partner_symbol: string
      symbol: string
    }[]
    HasWarning: boolean
    Message: string
    RateLimit: object
    Response: string
    Type: number
  }
}

export type Stock = {
  id: number
  name: string
  symbol: string
  marketCap: number
  price: number
  volume: number
  supply: number
  change: number
}

export type StocksFilter = {
  name: string
  symbol: string
  price: string
}

export type Prediction = {
  id: number
  title: string
  message: string
  date: number
  author: string
}

export type PredictionsFilter = {
  title: string
  message: string
  author: string
}

export enum GreedClassification {
  Fear = 'Fear',
  ExtremeFear = 'Extreme Fear',
  Neutral = 'Neutral',
  Greed = 'Greed',
  ExtremeGreed = 'Extreme Greed'
}

export type Greed = {
  value: number
  classification: GreedClassification
  timestamp: number
  dateFormatted: string
  timeUntilUpdate?: number
}

export type News = {
  imageurl: string
  title: string
  body: string
  author: string
  published: number
  categories: string
  url: string
}

export type Coin = {
  id: number
  availableFrom: number
  partnerSymbol: string
  symbol: string
}

export type Option = {
  label: string
  value: string
}