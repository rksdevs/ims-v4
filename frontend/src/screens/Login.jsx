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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../Features/authApiSlice";
import { useToast } from "../components/ui/use-toast";
import { setCredentials } from "../Features/authSlice";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const { toast } = useToast();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    userInfo && navigate("/");
  }, [userInfo, navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();
    // console.log(username, password);
    try {
      const userDetails = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...userDetails }));
      navigate("/");
      toast({
        title: `Login success`,
      });
    } catch (error) {
      toast({
        title: "Login Error",
        description: error?.data?.message || error?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="m-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={loginHandler}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
