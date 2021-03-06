import React, { useLayoutEffect, useState } from "react"
import theme from "../themes/theme";
import { debounce, objectMap } from "../utils/utils";

const useBreakpoints = (props) => {
    const isBrowser = typeof window !== "undefined"
    const [breakpoints, setBreakpoints] = useState(objectMap(theme.breakpoints, v => {
        return false;
    }))
    
    useLayoutEffect(() => {
        setBreakpoints(objectMap(theme.breakpoints, v => {
            return window.matchMedia(v).matches;
        }))
    }, [])

    React.useLayoutEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setBreakpoints(objectMap(theme.breakpoints, v => {
                return window.matchMedia(v).matches;
            }))
        }, 50)
    
        if (!isBrowser)
            return;
        
        window.addEventListener('resize', debouncedHandleResize)
    
        return _ => {
            window.removeEventListener('resize', debouncedHandleResize)
        }
    })

    return breakpoints;
}

export default useBreakpoints;