import React from 'react';
import Head from './Header';

export default props => {
  return (
    <div style={{ width: '95vw', margin: '0 auto'}}>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        />

      <Head {...props}/>
      {props.children}
    </div>
  );
};
