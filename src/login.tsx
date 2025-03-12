import {z} from "zod";
import {useAuth} from "~service/auth/UseAuth";
import {useState} from "react";
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from "~components/ui/Button";
import {Input} from "~components/ui/Input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~components/ui/Form";
import {useForm} from "react-hook-form";
import {Alert, AlertDescription} from "~components/ui/Alert";

const formSchema = z.object({
    username: z.string().min(1, {message: "Username is required"}),
    password: z.string().min(1, {message: "Password is required"}),
});
type FormType = z.infer<typeof formSchema>;


export function SignInForm() {
    const {login} = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    });

    const onSubmit = async (values: FormType) => {
        setIsLoading(true);
        setError('');

        try {
            await login(values.username, values.password);
        } catch (error) {
            setError(error.message || 'Invalid username or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 w-full max-w-md">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Welcome back</h1>
                <p className="text-gray-500">Enter your credentials to sign in</p>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>

                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>
            </Form>

            <div className="text-center">
                <p className="text-sm text-gray-500">
                    Don't have an account?{" "}
                    <a href="/auth/sign-up"
                       className="text-primary underline underline-offset-4 hover:text-primary/90">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}