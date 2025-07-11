// CSS
import './css/main.css';
import './css/home.css';

import logo from '../assests/logo3.png';
import ProjectList from './ProjectList';
import BlogList from './BlogList';

import useTypewriter from '../hooks/useTypewriter';

function Home() {

  const roles = ['Software Engineer', 'Robotic Enthusiast']
  const writer = useTypewriter(roles);

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
          a <span className='plum'>{writer}</span>
        </p>
      </div>
        <img src={logo} height={256} width={256} alt='cat shaped letter g'/>
      </div>
        <h3>Projects</h3>
        <ProjectList limit={4} />
        <h3>Blogs</h3>
        <BlogList limit={4}/>
    </div>
  );
}

export default Home;
