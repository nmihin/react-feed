import React from 'react';
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from '@/lib/validation/index';
import { Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createUserAccount } from '@/lib/appwrite/api';
import { useToast } from "@/components/ui/use-toast";
import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/queriesAndMutations';

const SignupForm = () => {
    const { toast } = useToast();
    const { mutateAsync, createUserAccount, isLoading: isCreatingAccount } = useCreateUserAccount();

    const navigate = useNavigate();
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
    
    const { mutateAsync: signInAccount, isLoading: isSigningIn } = useSignInAccount();

    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
        },
    });

    async function onSubmit(values: z.infer<typeof SignupValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const newUser = await createUserAccount(values);

        if(!newUser) {
            return toast({
                title: "Sign up failed. Please try again!"
              })
        }

        const session = await signInAccount({
            email: values.email,
            password: values.password,
        });

        if(!session) {
            return toast({
                title: "Sign in failed. Please try again!"
              })
        }

        const isLoggedIn = await checkAuthUser();

        if(isLoggedIn) {
            form.reset();

            navigate('/');
        } else {
            return toast({
                title: "Sign in failed. Please try again!"
              })
        }
    }

    return (
        <Form {...form}>
            <div className="flex-col sm:w-420 flex-center">
                <img src="/assets/images/logo.svg" />
                <h2 className="pt-5 h3-bold md:h2-bold sm:pt-12">Create a new account</h2>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Name Field */}
                <FormField
    control={form.control}
    name="name"
    render={({ field }) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="John Doe" {...field} className="text-white bg-gray-800 border-gray-600" />
                    </FormControl>
                    <FormDescription>
                        Your full name.
                    </FormDescription>
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
                        <Input type="email" placeholder="youremail@example.com" {...field} className="text-white bg-gray-800 border-gray-600" />
                    </FormControl>
                    <FormDescription>
                        Your email address.
                    </FormDescription>
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
                        <Input type="password" placeholder="******" {...field} className="text-white bg-gray-800 border-gray-600" />
                    </FormControl>
                    <FormDescription>
                        Your password.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="shadcn" {...field} className="text-white bg-gray-800 border-gray-600" />
                    </FormControl>
                    <FormDescription>
                        This is your public display name.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />

                <Button type="submit" className="shad-button_primary">
                    {isCreatingUser ? (
                        <div className="gap-2 flex-center">
                            <Loader /> Loading...
                        </div>
                    ):
                    "Sign up"
                    }
                </Button>

                <p className="mt-2 text-center text-small-regular text-light-2">
                    Already have an account?
                    <Link to={'/sign-in'} className="ml-1 text-primary-500 text-small-demibold"></Link>
                </p>
            </form>
        </Form>
    );
}

export default SignupForm;
