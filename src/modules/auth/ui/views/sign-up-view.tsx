"use client";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert,AlertTitle } from "@/components/ui/alert";
import {  OctagonAlertIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGithub,FaGoogle} from "react-icons/fa";

const FormSchema = z.object({
    name : z.string().min(1,{message : "Name is required"}),
    email : z.string().email(),
    password : z.string().min(1,{message : "password is required"}),
    confirmpassword : z.string().min(1,{message : "password is required"})
})
.refine((data) => data.password === data.confirmpassword,
{
    message : "passwords are not same",
    path : ["confirmpassword"],
});

export const SignUpView = () => {
    const router = useRouter();
    const [error,seterror] = useState<string|null>(null);
    const [pending, setpending] = useState(false);

 
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues : {
            name : "",
            email :"",
            password:"",
            confirmpassword:"",
        },
    });

    const onSubmit = async (data : z.infer<typeof FormSchema>) => {
        seterror(null);
        setpending(true);
     await  authClient.signUp.email(
  { 
    name : data.name,
    email: data.email,
    password: data.password,
    callbackURL: "/",
  },
  {
    onSuccess: () => {
        setpending(false);
        router.push("/");
    },
    onError: ({error}) => {
        setpending(false);
        seterror(error.message)
    },
    
  }
);

    };

 const onSocial = async (provider : "github"|"google") => {
        seterror(null);
        setpending(true);
     await  authClient.signIn.social(
  {
    provider : provider,
    callbackURL : "/"
  },
  {
    onSuccess: () => {
        setpending(false);
      
    },
    onError: ({error}) => {
        setpending(false);
        seterror(error.message)
    },
    
  }
);

    };
  
    return(
        <div className="flex flex-col gap-6">
        <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
               <Form{...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8"> 
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">
                        Let&apos;s Get Started
                    </h1>
                    <p className="text-muted-foreground text-balance">
                        Create your account
                    </p>
                    </div>

                    <div className="grid gap-3">
                     <FormField
                     control={form.control}
                     name="name"
                     render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                type = "text"
                                placeholder="My Name"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                     )}/>
                    </div>
                    

                    <div className="grid gap-3">
                     <FormField
                     control={form.control}
                     name="email"
                     render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                type = "email"
                                placeholder="M@exmaple.com"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                     )}/>
                    </div>
                    

                    <div className="grid gap-3">
                     <FormField
                     control={form.control}
                     name="password"
                     render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                type = "password"
                                placeholder="********"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                     )}/>
                    </div>
                    
                    <div className="grid gap-3">
                     <FormField
                     control={form.control}
                     name="confirmpassword"
                     render={({field}) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                type = "password"
                                placeholder="********"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                     )}/>
                    </div>
                    
                    {!!error &&(
                        <Alert className="bg-destructive/10 border-none">
                            <OctagonAlertIcon className="h-4 w-4 !text-destructive"/>
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    )}

                    <Button
                    disabled = {pending}
                    type="submit"
                    className="w-full"
                    >
                        Sign In
                    </Button>
                    <div className="after: border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-card text-muted-foreground relative z-10 px-2">Or Continue with</span>

                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                        onClick={() => onSocial("google")}
                        disabled = {pending}
                        variant={"outline"}
                        type="button"
                        className="w-full">
                            <FaGoogle/>
                        </Button>
                        <Button
                        onClick={() => onSocial("github")}
                        disabled = {pending}
                        variant={"outline"}
                        type="button"
                        className="w-full">
                            <FaGithub/>
                        </Button>
                    </div>
                    <div className="text-center text-sm">
                    Already have an Account<Link className="underline underline-offset-4" href="/sign-in"> Sign In
                        </Link>
                    </div>
                </div>
                </form>
                </Form>
                <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 justify-center items-center">
                    <img src ="/logo.svg" alt ="Image" className="p-4 h-[96px] w-[96px]"></img>
                     <p className="text-2xl font-semibold text-white p-5">
                        Converse.AI
                     </p>
                </div>
            </CardContent>
        </Card>

        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking Continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Private Policy</a> 

        </div>
        </div>
        
    );
};