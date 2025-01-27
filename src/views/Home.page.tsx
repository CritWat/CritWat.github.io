import {Welcome} from "../Welcome/Welcome.tsx";
import {ColorSchemeToggle} from "../components/ColorSchemeToggle/ColorSchemeToggle.tsx";

export function HomePage() {
    return (
        <>
            <Welcome />
            <ColorSchemeToggle />
        </>
    );
}