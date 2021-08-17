import { useEffect, useCallback, useRef } from 'react'
import _ from 'lodash'

const useThrottle = (cb: Function, delay: number) => {
  const options = { leading: true, trailing: false }
  const cbRef = useRef(cb)
  useEffect(() => {
    cbRef.current = cb
  })
  return useCallback(
    _.throttle((...args) => cbRef.current(...args), delay, options),
    [delay]
  )
}

export default useThrottle
