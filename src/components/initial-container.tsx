import { Card } from "./ui/card";

const InitialContainer = (props: React.PropsWithChildren) => {
  return (
    <div className="flex justify-center items-center">
      <Card className="max-w-5xl bg-green-400">{props.children}</Card>
    </div>
  );
};

export default InitialContainer;
