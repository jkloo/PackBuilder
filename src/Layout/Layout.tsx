import { FooterSocial } from "@/components/FooterSocial/FooterSocial";
import { HeaderSimple } from "@/components/HeaderSimple/HeaderSimple";
import { AppShell, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router";

export function Layout() {

    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
            padding="md"
        >
        <AppShell.Header>
            <HeaderSimple/>
        </AppShell.Header>

        <AppShell.Navbar py="md" px={4}>
        </AppShell.Navbar>

        <AppShell.Main>
            <Container>
            <Outlet/>
            </Container>
        </AppShell.Main>

        <AppShell.Footer>
            <FooterSocial/>
        </AppShell.Footer>
        
        </AppShell>
    )
}