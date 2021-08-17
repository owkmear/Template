import { actions as stocksActions } from './stocks'
import { actions as greedActions } from './greed'
import { actions as predictionsActions } from './predictions'
import { actions as newsActions } from './news'
import { actions as chartsActions } from './charts'

export { default as stocks } from './stocks'
export { default as greed } from './greed'
export { default as predictions } from './predictions'
export { default as news } from './news'
export { default as charts } from './charts'

export const actions = {
	...stocksActions,
	...greedActions,
	...predictionsActions,
	...newsActions,
	...chartsActions
}