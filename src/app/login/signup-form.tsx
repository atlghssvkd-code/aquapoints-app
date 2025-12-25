"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FirebaseError } from "firebase/app";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { signUp } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import { useAuth, useFirestore } from "@/firebase";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const auth = useAuth();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
        signUp(auth, firestore, values.email, values.password, values.name).then(() => {
            toast({
              title: "Sign Up Successful",
              description: "Your account has been created.",
            });
            router.push("/dashboard");
        }).catch(error => {
            console.error("Sign up failed:", error);
            let description = "An unexpected error occurred. Please try again.";
            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        description = "This email address is already in use by another account.";
                        break;
                    case "auth/weak-password":
                        description = "The password is too weak. Please use a stronger password.";
                        break;
                    case "auth/invalid-email":
                        description = "The email address is not valid.";
                        break;
                    default:
                        description = "Failed to create an account. Please try again later.";
                }
            }
            toast({
              variant: "destructive",
              title: "Sign Up Failed",
              description: description,
            });
        });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Alex Johnson" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="alex.j@school.edu" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
        </Button>
      </form>
    </Form>
  );
}
