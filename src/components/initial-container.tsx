import { Card } from "./ui/card";

const InitialContainer = (props: React.PropsWithChildren) => {
  return (
    <div className="flex justify-center items-center my-20">
      <Card className="max-w-5xl ">{props.children}</Card>
    </div>
  );
};

export default InitialContainer;
