import * as React from 'react';
import { styles, cssProps, colors } from '../theme';

import Store = require('electron-store');
import { css } from 'glamor';
import { ipcRenderer } from 'electron';

const font = cssProps({
  color: colors.black,
});

// a sample store
const store = new Store();

interface WelcomePageState {
  heading: string
}

export class WelcomePage extends React.Component<{}, WelcomePageState> {
  state: WelcomePageState = {
    heading: 'Evia',
  };

  componentDidMount() {
      store.set('heading', this.state.heading);
  }
  
  print(content: string) {
      ipcRenderer.send('print-out', content);
  }

  render() {
    return (
      <div id="WelcomeScreen" {...css(styles.flex1, font)}>
        Hello Evia!
        <button onClick={() => this.print('Test')}>Click and print</button>
      </div>
    );
  }
}
