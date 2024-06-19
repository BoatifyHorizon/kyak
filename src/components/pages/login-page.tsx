import InitialContainer from "../initial-container";
import LoginForm from "../login-form";

const LoginPage = () => {
  return (
    <InitialContainer>
      <div className="flex">
        <div className="p-4">
          <LoginForm />
        </div>
      </div>
    </InitialContainer>
  );
};

export default LoginPage;
