// NetworkIndicatorStatus.js

import React, { useState, useEffect } from 'react';

const NetworkIndicatorStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  return (
    <div className={`network-indicator ${isOnline ? 'online' : 'offline'}`}>
      {isOnline ? '' : ''}
    </div>
  );
};

export default NetworkIndicatorStatus;
