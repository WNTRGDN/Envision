import React, { FC, useState } from 'react'
import { Alert as BSAlert, Button } from 'react-bootstrap';
import IAlert from './IAlert';

const Alert: FC<IAlert> = (alert) => {

    const [show, setShow] = useState(true);

    if (show) {
        return (
          <BSAlert variant={alert.variant.toLowerCase()} onClose={() => setShow(false)} dismissible>
            <span dangerouslySetInnerHTML={{__html: alert.content}}></span>
          </BSAlert>
        );
      }
      
      return null;
}

export default Alert