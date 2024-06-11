import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { LodkaItem, getLodkaItems } from "../connection/stock";
import Layout from "../layout";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

interface StockCardProps {
  title: string;
  description: string;
  image: ImageProps;
}

interface TabProps<TData> {
  isPending: boolean;
  data: TData[];
}

export interface ImageProps {
  src: string;
  alt: string;
}

const StockPage = () => {
  const { isPending, data } = useQuery({
    queryKey: ["lodkaData"],
    queryFn: getLodkaItems,
  });

  return (
    <Layout>
      <div className="text-xl font-medium tracking-wide px-3">Asortyment</div>
      <Separator className="w-full my-3" />
      <div className="px-3">
        <Tabs defaultValue="lodki" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="lodki">Łódki</TabsTrigger>
            <TabsTrigger value="wiosla">Wiosła</TabsTrigger>
            <TabsTrigger value="odziez">Odzież</TabsTrigger>
          </TabsList>
          <TabsContent value="lodki">
            <LodkiTab isPending={isPending} data={data ?? []} />
          </TabsContent>
          <TabsContent value="wiosla">Change your password here.</TabsContent>
          <TabsContent value="odziez">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const getLodkaCapacityCount = (cap: number, data: LodkaItem[]) => {
  return data.find((d) => d.capacity === cap);
};

const LodkiTab = (props: TabProps<LodkaItem>) => {
  if (props.isPending) {
    return (
      <div className="flex gap-4">
        <StockCardSkeleton />
        <StockCardSkeleton />
        <StockCardSkeleton />
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {props.data.map((d) => (
        <StockCard
          key={`stockCard-${d.name}`}
          title={d.name}
          description={d.description}
          image={{
            src: "src/assets/l1os.png",
            alt: "morska_1os",
          }}
        />
      ))}
    </div>
  );
};

const StockCard = (props: StockCardProps) => {
  return (
    <div className="w-72 flex flex-col border rounded-sm">
      <div className="w-full h-72">
        <img src={props.image.src} alt={props.image.alt} className="rounded-t-sm w-full h-full object-cover" />
      </div>
      <div className="p-4 flex flex-col">
        <div className="text-lg font-semibold">{props.title}</div>
        <div className="text-sm text-muted-foreground">{props.description}</div>
      </div>
    </div>
  );
};

const StockCardSkeleton = () => {
  return (
    <div className="w-72 flex flex-col border rounded-sm">
      <Skeleton className="w-full h-72 rounded-none" />
      <div className="p-4 flex flex-col">
        <Skeleton className="h-[18px] w-24" />
        <Skeleton className="h-[14px] w-40 my-4" />
      </div>
    </div>
  );
};

export default StockPage;
