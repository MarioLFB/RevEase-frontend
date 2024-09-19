import ProductList from '../../components/ProductList';
import Login from '../../components/login';
import RegisterForm from '../../components/RegisterForm';
import LogoutButton from '../../components/Logout';


function Home() {
  return (
    <div>
        <h1>Home</h1>
        <ProductList />
        <Login />
        <RegisterForm />
        <LogoutButton />
    </div>
  );
}

export default Home;