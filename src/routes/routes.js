import Login from "../pages/auth/Login/Login";
import AddMovie from "../pages/Movies/AddMovie/AddMovie";
import EditMovie from "../pages/Movies/EditMovie/EditMovie";
import MovieList from "../pages/Movies/ListMovies/MovieList";



const routes = {
  public: [
    { path: '/', component: Login, exact: true },
    { path: '/login', component: Login },
  
  ],

    private: [
      { path: '/movies', component: MovieList  },
      { path: '/add-movie', component: AddMovie},
      { path: '/edit-movie', component: EditMovie },
    ]
    
  
};

export default routes;
