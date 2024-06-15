import ReactDOM from 'react-dom/client'
import Routes from './utils/routes.tsx'
import { WindowSizeProvider } from './utils/context/Responsive.tsx'
import { ParallaxProvider } from 'react-scroll-parallax'

import './assets/styles/tailwind.css'
import './assets/styles/global.css'
import './assets/styles/fonts.css'
import 'animate.css';
import { SelectedGenderProvider } from './utils/context/Gender.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(  
  <SelectedGenderProvider>
    <ParallaxProvider>
      <WindowSizeProvider>
        <Routes />
      </WindowSizeProvider>
    </ParallaxProvider>
  </SelectedGenderProvider>  
)
