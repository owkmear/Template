import { useEffect, useMemo, useRef } from 'react'
import _ from 'lodash'

const useIsMounted = () => {
  const isMountedRef = useRef(true)
  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])
  return () => isMountedRef.current
}

const options = {
  leading: false,
  trailing: true,
}

function useDebounce(cb: any, delay: number) {
  const inputsRef = useRef(cb)
  const isMounted = useIsMounted()
  useEffect(() => {
    inputsRef.current = { cb, delay }
  })

  return useMemo(
    () => _.debounce(
        (...args) => {
          if (inputsRef.current.delay === delay && isMounted()) inputsRef.current.cb(...args)
        },
        delay,
        options
      ),
    [delay, isMounted]
  )
}

export default useDebounce
