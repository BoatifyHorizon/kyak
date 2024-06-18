import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ProfileData, changePassword, getProfileData } from "@/connection/profile";
import useAuth from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Layout from "../layout";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";

const ProfilePage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.loading && !auth.isAuthenticated) {
    navigate("/login");
  }

  const { isPending, data } = useQuery({
    queryKey: ["profileData"],
    queryFn: getProfileData,
  });
  const { toast } = useToast();

  const profile: ProfileData = data
    ? data
    : {
        fullname: "Unknown",
        email: "unknown@email.com",
        phone: "+00 000 000 000",
        currentBooking: 0,
        allBookings: 0,
      };

  const formSchema = z
    .object({
      newPwd: z.string({ message: "To pole jest wymagane" }).min(1, { message: "To pole jest wymagane" }),
      newPwdRepeat: z.string({ message: "To pole jest wymagane" }).min(1, { message: "To pole jest wymagane" }),
    })
    .refine((values) => values.newPwd === values.newPwdRepeat, {
      message: "Hasła nie są identyczne",
      path: ["newPwdRepeat"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Trwa zmiana hasła...",
      description: "To może chwilę potrwać.",
    });

    const resp = await changePassword(values.newPwd);
    if (resp) {
      toast({
        title: "Sukces! Hasło zostało zmienione.",
        description: "Od teraz musisz używać nowego hasła do logowania.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Zmiana hasła nie powiodła się.",
        description: "Jeśli chcesz zmienić hasło spróbuj ponownie.",
      });
    }
  }

  if (isPending) {
    return (
      auth.isAuthenticated && (
        <Layout>
          <div className="text-xl font-medium tracking-wide px-3">Profil</div>
          <Separator className="w-full my-3" />
          <div className="px-3 flex flex-col gap-4 w-full justify-center items-center">
            <div className="flex items-center justify-center ">
              <div className="flex flex-col items-center">
                <UserRound className="h-24 w-24 text-primary" />
                <Skeleton className="w-[12rem] h-6 rounded-md" />
              </div>
            </div>
            <Skeleton className="w-[15rem] h-4 rounded-md" />
            <Skeleton className="w-[10rem] h-4 rounded-md" />
            <div className="flex justify-between p-3 border rounded-md">
              <div className="flex flex-col items-center px-6">
                <Skeleton className="w-[3rem] h-6 rounded-md" />
                <div className="text-sm font-normal w-24 text-center">Trwające rezerwacje</div>
              </div>
              <div className="flex flex-col items-center px-6">
                <Skeleton className="w-[3rem] h-6 rounded-md" />
                <div className="text-sm font-normal w-24 text-center">Wszystkie rezerwacje</div>
              </div>
            </div>

            <Button disabled className="w-32">
              Zmień hasło
            </Button>
          </div>
        </Layout>
      )
    );
  }

  return (
    auth.isAuthenticated && (
      <Layout>
        <div className="text-xl font-medium tracking-wide px-3">Profil</div>
        <Separator className="w-full my-3" />
        <div className="px-3 flex flex-col gap-4 w-full justify-center items-center">
          <div className="flex items-center justify-center ">
            <div className="flex flex-col items-center">
              <UserRound className="h-24 w-24 text-primary" />
              <div className="text-3xl font-medium">{profile.fullname}</div>
            </div>
          </div>
          <div>{profile.email}</div>
          <div>{profile.phone}</div>
          <div className="flex justify-between p-3 border rounded-md">
            <div className="flex flex-col items-center px-6">
              <div className="font-bold text-xl">{profile.currentBooking}</div>
              <div className="text-sm font-normal w-24 text-center">Trwające rezerwacje</div>
            </div>
            <div className="flex flex-col items-center px-6">
              <div className="font-bold text-xl">{profile.allBookings}</div>
              <div className="text-sm font-normal w-24 text-center">Wszystkie rezerwacje</div>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-32">Zmień hasło</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Zmień hasło</DialogTitle>
                <DialogDescription>
                  Ta akcja nie może zostać cofnięta. Twoje hasło zostanie zmienione.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="newPwd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nowe hasło</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Nowe hasło" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPwdRepeat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Powtórz nowe hasło</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Powtórz nowe hasło" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-full flex justify-end">
                    <Button className="w-32" type="submit">
                      Zapisz
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </Layout>
    )
  );
};

export default ProfilePage;
