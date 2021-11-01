import * as React from "react";
import {
  ExtractRouteParams,
  Route,
  RouteChildrenProps,
  RouteComponentProps
} from "react-router";
import * as H from "history";
import { Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";
import { userAtom } from "../store";
import { useAtom } from "jotai";

interface Props<
  Path extends string = string,
  Params extends { [K: string]: string | undefined } = ExtractRouteParams<
    Path,
    string
  >
> {
  location?: H.Location | undefined;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  render?:
    | ((props: RouteComponentProps<Params>) => React.ReactNode)
    | undefined;
  children?:
    | ((props: RouteChildrenProps<Params>) => React.ReactNode)
    | React.ReactNode
    | undefined;
  path?: Path | readonly Path[] | undefined;
  exact?: boolean | undefined;
  sensitive?: boolean | undefined;
  strict?: boolean | undefined;
}

const ProtectedRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const [, setUser] = useAtom(userAtom);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);

    const fetchUser = async () => {
      setUser(await AuthService.getCurrentUser());
    };

    fetchUser();
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div>loading...</div>;

  return (
    <Route
      {...rest}
      render={(props) => {
        AuthService.isLoggedIn().then((res) => setIsAuth(res));
        if (isAuth) {
          return <Component {...props} />;
        }

        return <Redirect to='/login' />;
      }}
    ></Route>
  );
};

export default ProtectedRoute;
