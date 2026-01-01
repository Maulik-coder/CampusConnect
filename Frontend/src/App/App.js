import Router from "./Routes.js";
import { SidebarProvider } from "../Context/SidebarContext.js"


function App() {
  return (
    <SidebarProvider>
       
      <Router />

    </SidebarProvider>
  
  );
}

export default App;
