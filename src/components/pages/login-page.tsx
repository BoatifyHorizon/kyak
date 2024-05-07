import InitialContainer from "../initial-container";
import LoginForm from "../login-form";

const LoginPage = () => {
  return (
    <InitialContainer>
      <div className="flex p-4">
        <div>Image</div>
        <LoginForm />
      </div>
    </InitialContainer>
  );
};

export default LoginPage;
