import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { LodkaItem, StockItemEntity, getLodkaItems, getOdziezItems, getWioslaItems } from "../../connection/stock";
import style from "../../lib/scrollbar-style.module.css";
import Layout from "../layout";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/auth-provider";

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
  const auth = useAuth();
  if (auth.token === "") return <Navigate to="/login" />;

  const lodkaQuery = useQuery({
    queryKey: ["lodkaData"],
    queryFn: getLodkaItems,
  });
  const wioslaQuery = useQuery({
    queryKey: ["wioslaData"],
    queryFn: getWioslaItems,
  });
  const odziezQuery = useQuery({
    queryKey: ["odziezData"],
    queryFn: getOdziezItems,
  });

  if(lodkaQuery.data === false) return <Navigate to="/login" />;
  if(wioslaQuery.data === false) return <Navigate to="/login" />;
  if(odziezQuery.data === false) return <Navigate to="/login" />;

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
            <LodkiTab isPending={lodkaQuery.isPending} data={lodkaQuery.data ?? []} />
          </TabsContent>
          <TabsContent value="wiosla">
            <WioslaTab isPending={wioslaQuery.isPending} data={wioslaQuery.data ?? []} />
          </TabsContent>
          <TabsContent value="odziez">
            <OdziezTab isPending={odziezQuery.isPending} data={odziezQuery.data ?? []} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const OdziezTab = (props: TabProps<StockItemEntity>) => {
  if (props.isPending) {
    return (
      <div className={`w-full flex flex-col`}>
        <Skeleton className="w-[20rem] h-10 rounded-none mb-4" />
        <div className="flex gap-4">
          <StockCardSkeleton />
          <StockCardSkeleton />
          <StockCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col overflow-y-auto ${style}`}>
      <div className="text-xl font-semibold pb-5">Odzież klubowa</div>
      {props.data.map((d) => (
        <StockCard
          key={`stockCard-${d.name}-${d.id}`}
          title={d.name}
          description={d.description}
          image={{
            src: d.img,
            alt: d.imgAlt,
          }}
        />
      ))}
    </div>
  );
};

const WioslaTab = (props: TabProps<StockItemEntity>) => {
  if (props.isPending) {
    return (
      <div className={`w-full flex flex-col`}>
        <Skeleton className="w-[20rem] h-10 rounded-none mb-4" />
        <div className="flex gap-4">
          <StockCardSkeleton />
          <StockCardSkeleton />
          <StockCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col overflow-y-auto ${style}`}>
      <div className="text-xl font-semibold pb-5">Wiosłsa klubowe</div>
      {props.data.map((d) => (
        <StockCard
          key={`stockCard-${d.name}-${d.id}`}
          title={d.name}
          description={d.description}
          image={{
            src: d.img,
            alt: d.imgAlt,
          }}
        />
      ))}
    </div>
  );
};

const LodkiTab = (props: TabProps<LodkaItem>) => {
  if (props.isPending) {
    return (
      <div className={`w-full flex flex-col`}>
        <Skeleton className="w-[20rem] h-10 rounded-none mb-4" />
        <div className="flex gap-4">
          <StockCardSkeleton />
          <StockCardSkeleton />
          <StockCardSkeleton />
        </div>
      </div>
    );
  }

  const lodki1os = useMemo(() => props.data.filter((d) => d.capacity === 1), [props.data]);
  const lodki2os = useMemo(() => props.data.filter((d) => d.capacity === 2), [props.data]);
  const lodki4os = useMemo(() => props.data.filter((d) => d.capacity === 4), [props.data]);
  const lodki8os = useMemo(() => props.data.filter((d) => d.capacity === 8), [props.data]);

  const getLodki = (cap: 1 | 2 | 4 | 8) => {
    switch (cap) {
      case 1: {
        return (
          lodki1os.length > 0 && (
            <div className="mb-4 max-w-[60rem]">
              <div className="text-xl flex font-semibold pb-5">Łódki jednoosobowe</div>
              <div className="flex gap-4  overflow-x-auto">
                {lodki1os.map((d) => (
                  <StockCard
                    key={`stockCard-${d.name}-${d.id}`}
                    title={d.name}
                    description={d.description}
                    image={{
                      src: d.img,
                      alt: d.imgAlt,
                    }}
                  />
                ))}
              </div>
            </div>
          )
        );
      }
      case 2: {
        return (
          lodki2os.length > 0 && (
            <div className="mb-4 max-w-[60rem]">
              <div className="text-xl font-semibold pb-5">Łódki dwuosobowe</div>
              <div className="flex gap-4  overflow-x-auto">
                {lodki2os.map((d) => (
                  <StockCard
                    key={`stockCard-${d.name}-${d.id}`}
                    title={d.name}
                    description={d.description}
                    image={{
                      src: d.img,
                      alt: d.imgAlt,
                    }}
                  />
                ))}
              </div>
            </div>
          )
        );
      }
      case 4: {
        return (
          lodki4os.length > 0 && (
            <div className="mb-4 max-w-[60rem]">
              <div className="text-xl font-semibold pb-5">Łódki czteroosobowe</div>
              <div className="flex gap-4  overflow-x-auto">
                {lodki4os.map((d) => (
                  <StockCard
                    key={`stockCard-${d.name}-${d.id}`}
                    title={d.name}
                    description={d.description}
                    image={{
                      src: d.img,
                      alt: d.imgAlt,
                    }}
                  />
                ))}
              </div>
            </div>
          )
        );
      }
      case 8: {
        return (
          lodki8os.length > 0 && (
            <div className="mb-4 max-w-[60rem]">
              <div className="text-xl font-semibold pb-5">Łódki ośmioosobowe</div>
              <div className="flex gap-4  overflow-x-auto">
                {lodki8os.map((d) => (
                  <StockCard
                    key={`stockCard-${d.name}-${d.id}`}
                    title={d.name}
                    description={d.description}
                    image={{
                      src: d.img,
                      alt: d.imgAlt,
                    }}
                  />
                ))}
              </div>
            </div>
          )
        );
      }
    }
  };

  return (
    <div className={`w-full flex flex-col overflow-y-auto ${style}`}>
      {getLodki(1)}
      {getLodki(2)}
      {getLodki(4)}
      {getLodki(8)}
    </div>
  );
};

const StockCard = (props: StockCardProps) => {
  return (
    <div className="min-w-72 flex flex-col border rounded-sm mb-2">
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
