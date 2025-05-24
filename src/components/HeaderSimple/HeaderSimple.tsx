import { useState } from 'react';
import { Burger, Container, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './HeaderSimple.module.css';
import { AppLogo } from '../AppLogo/AppLogo';

const links = [
  { link: '/draft', label: 'Draft' },
  { link: '/packs', label: 'Packs' },
  { link: '/about', label: 'About' },
];

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    // <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Title order={2}>
          <AppLogo size={28} />
          Drafter
        </Title>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    //</header>
  );
}


