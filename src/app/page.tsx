"use client"

import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {

 const { data: session} = authClient.useSession() ;
  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      password,
      name,
    },{
      onError: () => {
        window.alert("Something went wrong");
      },
      
      onSuccess: () => {
        window.alert("Success");
      }
    });
  }

  const onLogin = () => {
    authClient.signIn.email({
      email,
      password,
      
    },{
      onError: () => {
        window.alert("Something went wrong");
      },
      
      onSuccess: () => {
        window.alert("Successfully Logged in");
      }
    });
  }
  
  if(session){
    return(
    <div className="p-4 flex flex-col gap-y-4">
      <p>Logged In as {session.user.name}</p>
      <Button onClick={() => authClient.signOut()}>
        Sign out
      </Button>
    </div>
    );
  }

  return (
    
    <div className="flex flex-col p-4 gap-y-4">
   <div className="p-4 flex flex-col gap-y-4 ">
    <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
    <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    <Input placeholder="Password" type="password" value={password} onChange={(e) =>setPassword(e.target.value)}/>
   <Button onClick={onSubmit}>
    Create User
   </Button>

   <div className="p-4 flex flex-col gap-y-4 ">
    <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    <Input placeholder="Password" type="password" value={password} onChange={(e) =>setPassword(e.target.value)}/>
   <Button onClick={onLogin}>
    Login
   </Button>
   </div>
    </div>
    </div>
  );
}
