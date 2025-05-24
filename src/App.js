
// Components
// import Navbar from './Components/Navbar.js';
// import Page from './Components/Page.js';
// import Footer from './Components/Footer.js';

import Link from './Components/Link.js';

// CSS
import './App.css';
import './Components/css/main.css';

function App() {
  return (
    <div className="App max-h max-w">
        {/* <Navbar />
        <Page />
        <Footer /> */}
      <p className="c" >
      Normal text, <a href="http://www.x.com/" target='_blank' rel='noreferrer'>this is link</a>
      </p>

      A normal text, alongside a <Link href='http://www.x.com/' message='hyperlink' openNewTab={false} /> 
      <br />
      Another normal text, alongside a <Link href='http://www.x.com/' message='hyperlink' openNewTab /> that opens in a new tab.


    </div>
  );
}

export default App;
