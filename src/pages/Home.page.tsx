import { AppShell, Container, Title } from "@mantine/core";

export function HomePage() {
  return (
    <>
    <AppShell.Main>
      <Container>
      <Title>Home</Title>
      </Container>
    </AppShell.Main>
    <AppShell.Aside>
      Foo
    </AppShell.Aside>
    </>
  );
}
