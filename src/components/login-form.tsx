import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { z } from "zod";

const LoginForm = () => {
  return (
    <div className="px-2">
      <Tabs defaultValue="login" className="min-w-[20rem] max-w-[30rem]">
        <TabsList>
          <TabsTrigger value="login">Logowanie</TabsTrigger>
          <TabsTrigger value="register">Rejestracja</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginInputForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterInputForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const LoginInputForm = () => {
  const mutation = useMutation({
    mutationFn: (loginData: z.infer<typeof loginSchema>) => {
      return axios.post("/login", loginData);
    },
  });

  const loginSchema = z.object({
    username: z.string().min(1, { message: "To pole nie moze być puste." }),
    password: z.string().min(1, { message: "To pole nie moze być puste." }),
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutation.mutate(values);
  }

  if (mutation.isSuccess) {
    <Navigate to="/" />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {mutation.isError && (
          <FormDescription className="text-destructive">Hasło lub email są nieprawidłowe</FormDescription>
        )}
        {mutation.isPending ? (
          <Button className="w-1/2" type="submit">
            <LoaderCircle className="h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button className="w-1/2" type="submit">
            Zatwierdź
          </Button>
        )}
      </form>
    </Form>
  );
};

const RegisterInputForm = () => {
  const mutation = useMutation({
    mutationFn: (registerData: z.infer<typeof registerSchema>) => {
      return axios.post("/register", registerData);
    },
  });

  const registerSchema = z
    .object({
      name: z.string().min(1, { message: "To pole nie moze być puste." }),
      surname: z.string().min(1, { message: "To pole nie moze być puste." }),
      username: z.string().min(1, { message: "To pole nie moze być puste." }),
      phone: z.string().regex(/^\d{9}$/, { message: "Nieprawidłowy format. Przykład numeru - 123456789" }),
      password: z.string().min(1, { message: "To pole nie moze być puste." }),
      repeatPassword: z.string().min(1, { message: "To pole nie moze być puste." }),
    })
    .refine(
      (data) => {
        return data.password === data.repeatPassword;
      },
      {
        message: "Hasła się nie zgadzają.",
        path: ["repeatPassword"],
      }
    );

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      surname: "",
      username: "",
      phone: "",
      password: "",
      repeatPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    mutation.mutate(values);
  }

  if (mutation.isSuccess) {
    <Navigate to="/" />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imię</FormLabel>
              <FormControl>
                <Input placeholder="Jan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwisko</FormLabel>
              <FormControl>
                <Input placeholder="Kowalski" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numer telefonu</FormLabel>
              <FormControl>
                <Input placeholder="123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Powtórz hasło</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {mutation.isError && (
          <FormDescription className="text-destructive">
            Nie udało się stworzyć konta. Spórbuj ponownie.
          </FormDescription>
        )}
        {mutation.isPending ? (
          <Button className="w-1/2" type="submit">
            <LoaderCircle className="h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button className="w-1/2" type="submit">
            Zatwierdź
          </Button>
        )}
      </form>
    </Form>
  );
};

export default LoginForm;
