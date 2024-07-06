import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "./providers/auth-provider";
import { useState } from "react";

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
  const auth = useAuth();
  const [error, setError] = useState<string>("");

  const mutation = useMutation({
    mutationFn: async (loginData: z.infer<typeof loginSchema>) => {
      auth.loginAction({ username: loginData.username, password: loginData.password });
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

  if(mutation.isError) {
    setError("Hasło lub email są nieprawidłowe.")
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
      {error.length > 0 ? <p className="text-destructive">{error}</p> : ""}
    </Form>
  );
};

const RegisterInputForm = () => {
  const auth = useAuth();

  const mutation = useMutation({
    mutationFn: async (registerData: z.infer<typeof registerSchema>) => {
      auth.register({
        email: registerData.username,
        name: registerData.name,
        surname: registerData.surname,
        phone: registerData.phone,
        password: registerData.password,
      });
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
