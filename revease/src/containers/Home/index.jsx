import ProductList from '../../components/ProductList';
import Login from '../../components/login';
import RegisterForm from '../../components/RegisterForm';


function Home() {
  return (
    <div>
        <h1>Home</h1>
        <ProductList />
        <Login />
        <RegisterForm />
    </div>
  );
}

export default Home;