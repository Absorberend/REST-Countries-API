import { useEffect } from "react";


export default function useCloseOnEsc(callback) {
    useEffect(() => {
        const keyDownHandler = event => {
      
            if (event.key === 'Escape') {
              event.preventDefault();
      
              callback();
            }
          };

          document.addEventListener('keydown', keyDownHandler);

          return () => {
            document.removeEventListener('keydown', keyDownHandler);
          };

    }, [callback])

}
