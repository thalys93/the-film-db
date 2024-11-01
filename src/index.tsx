import { Outlet } from "react-router-dom"
import NavigationBar from "./components/navbar"
import FooterBar from "./components/footerBar/FooterBar"
function Index() {  
  return (
    <>   
      <NavigationBar/>
      <Outlet/>
      <FooterBar/>
    </>
  )
}

export default Index
