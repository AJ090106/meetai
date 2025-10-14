"use client"

import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const HomeView = () => {
    const router = useRouter();
    const { data : session} = authClient.useSession();

    if(!session){
      return(
        <p>Loading....</p>
      )
    }

   return(
    <div className="p-4 flex flex-col gap-y-4">
      <p>Logged In as {session.user.name}</p>
      <Button onClick={() => authClient.signOut({fetchOptions : {onSuccess : () => router.push("/sign-in"), }})}>
        Sign out
      </Button>
    </div>
    );
}
