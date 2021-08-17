export function* mainSaga() {
	const message = 'run main saga'
	console.log(message)
	yield message
}