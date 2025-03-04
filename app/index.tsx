import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";


const Home = () => {
    const { IsSignedIn } = useAuth();

    if (IsSignedIn) {
        return <Redirect href="/(root)/(tabs)/home" />;
    };

    return <Redirect href="/(auth)/welcome" />
}

export default Home;