import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { AppShell, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router";

export function Layout() {

    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
            aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
            padding="md"
        >
        <AppShell.Header>
            <Header/>
        </AppShell.Header>

        <AppShell.Navbar py="md" px={4}>
        </AppShell.Navbar>

        <Outlet/>

        {/* <AppShell.Footer>
            <Footer/>
        </AppShell.Footer> */}
        
        </AppShell>
    )
}