import {BrowserRouter, Route, Routes} from "react-router-dom";
import Room from "./pages/Room";
import Main from "./pages/Main";
import NotFound404 from "./pages/NotFound404";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route>
                <Route exact path='/room/:id' element={<Room />} />
                <Route exact path='/' element={<Main />} />
                <Route component={<NotFound404 />} />
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
