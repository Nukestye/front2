
// CSS
import './Components/css/main.css';
import './Components/css/home.css';

import logo from './assests/logo3.png';

function Home() {
  return (
    <div className="container">
      <div className='intro'>
      <div className='intro-text'>
        <p className='intro-text-start'>
          Hello, <br />
          I am <span className='plum'>gohar</span>
        </p>

        <p className='intro-text-mid'>
          aka <span className='plum'>nukestye</span>
        </p>

        <p className='intro-text-end'>
          a Software Engineer/Robotic enthusiast
        </p>
      </div>

      <img src={logo} height={256} width={256} alt='cat shaped letter g'/>

      </div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Home;
