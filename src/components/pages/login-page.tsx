import InitialContainer from "../initial-container";
import LoginForm from "../login-form";

const LoginPage = () => {
  return (
    <InitialContainer>
      <div className="flex">
        {/* <div className="w-[200px] rounded-md">
          <AspectRatio ratio={16 / 9}>
            <img className="rounded-md min-w-2" src="src/assets/przystan.png" />
            <Img src={mainImage} />
          </AspectRatio>
        </div> */}
        <div className="p-4">
          <LoginForm />
        </div>
      </div>
    </InitialContainer>
  );
};

export default LoginPage;
