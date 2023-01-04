import React from "react";
import GlobalStyle from "./styles/global";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import { VideoProvider } from "./contexts/video";

const App = () => {
    return (
        <AuthProvider>
            <VideoProvider>
                <RoutesApp />
                <GlobalStyle />
            </VideoProvider>
        </AuthProvider>
    )
}

export default App;