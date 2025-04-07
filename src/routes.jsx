import Login from "./features/auth/Login";
import Administration from "./pages/administration/Administration";
import Groups from "./pages/administration/Groups";
import Organization from "./pages/administration/Organization";
import Home from "./pages/Home";

export const routes = [
    { path: "/", component: <Home />  },
    { path: "/login", component: <Login />  },
    { path: "/administration", component: <Administration />  },
    { path: "/organization", component: <Organization />  },
    { path: "/groups/:id", component: <Groups />  },
]; 