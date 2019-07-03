import React from 'react';
//import logo from './logo.svg';
import styles from './layout.sass';

class Layout extends React.Component{

  render(){
    return(
      <div className={styles.wrepper}>
        <header>
          <p>head</p>
        </header>
        <main>
          { this.props.children }
        </main>
        <footer>
          <h1>footer</h1>
        </footer>
      </div>
    )
  }
}
export default Layout;
