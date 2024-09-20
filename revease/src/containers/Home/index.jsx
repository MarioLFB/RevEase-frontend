import ProductList from '../../components/ProductList';
import Login from '../../components/login';
import LogoutButton from '../../components/Logout';


function Home() {
  return (
    <div>
        <h1>Home</h1>
        <ProductList />
        <Login />
        <LogoutButton />
    </div>
  );
}

export default Home;