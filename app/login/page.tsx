import LoginForm from './LoginForm';  // Import the LoginForm component

export default function LoginPage() {
  return (
    <div className='login-container'>
      <h1 className='text-center text-2xl'>Login</h1>
      <LoginForm next="/" /> {/* This ensures after login, it redirects to "/" */}
    </div>
  );
}
