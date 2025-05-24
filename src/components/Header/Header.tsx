import { NavLink, useMatch } from 'react-router';
import { Burger, Container, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AppLogo } from '@/components/AppLogo/AppLogo';

import classes from './Header.module.css';

const links = [
  { link: '/', label: 'Home' },
  { link: '/packs', label: 'Packs' },
  { link: '/about', label: 'About' },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
      <Container size="md" className={classes.inner}>
        
        <Title order={2}>
          <AppLogo size={28} />
          {"Drafter"}
        </Title>
        <Group gap={5} visibleFrom="xs">
          {
            links.map((link) => 
              <NavLink
                key={link.link}
                to={link.link}
                className={classes.link}
              >
                {link.label}
              </NavLink>
            )
          }
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
  );
}


