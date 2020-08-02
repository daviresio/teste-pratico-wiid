import {useEffect} from 'react';

const useClickOutside = (ref: any, callback: Function) => {
    const handleClick = (e: any) => {
        if (ref.current.contains && !ref.current.contains(e.target)) {
            callback()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    })

};

export default useClickOutside;