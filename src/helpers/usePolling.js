import { useEffect, useRef, useState } from 'react';
import { fetchAllTodos } from '../store/actions/contexts';
import { getLastEdit } from './getLastEdit';

const POLLING_INTERVAL = 5000;

export const usePolling = (passphrase, dispatch) => {
  const [lastEdit, setLastEdit] = useState(0);

  // get latest lastEdit inside setInterval closure
  const ref = useRef(0);
  ref.current = lastEdit;

  useEffect(() => {
    if (!passphrase) {
      return;
    }

    // poll only while window is in focus
    let interval = null;
    const poll = async () => {
      const timestamp = Date.parse(await getLastEdit(passphrase));

      // first time: just set the timestamp
      if (timestamp && !ref.current) {
        return setLastEdit(timestamp);
      }

      // refresh
      if (timestamp > ref.current) {
        dispatch(fetchAllTodos());
        setLastEdit(timestamp);
      }
    };
    const startInterval = () => {
      interval = setInterval(poll, POLLING_INTERVAL);
    };

    window.addEventListener('focus', () => {
      poll();
      startInterval();
    });
    window.addEventListener('blur', () => clearInterval(interval));

    // initial
    if (document.hasFocus() && !interval) {
      startInterval();
    }
  }, [passphrase, dispatch]);
};
