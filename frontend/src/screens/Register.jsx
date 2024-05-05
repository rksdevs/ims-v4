import { Link, useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useToast } from "../components/ui/use-toast";
import { useRegisterMutation } from "../Features/authApiSlice";
import { setCredentials } from "../Features/authSlice";
import { useSelector } from "react-redux";

export function Register() {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { toast } = useToast();
  const [registerUser, { isLoading, error }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    userInfo && navigate("/");
  }, [userInfo, navigate]);

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const userDetails = await registerUser({
        username,
        email,
        password,
      }).unwrap();
      dispath(setCredentials({ ...userDetails }));
      navigate("/");
      toast({
        title: "Register Successful!",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Register Error",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="m-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={registerHandler}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
