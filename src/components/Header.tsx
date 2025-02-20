import { NavLink } from "react-router-dom";
import {useDisclosure} from "@mantine/hooks";
import {MdViewInAr} from "react-icons/md";
import {
    Box, Burger,
    Button,
    Center, Collapse, Divider, Drawer,
    Group,
    HoverCard,
    ScrollArea,
    SimpleGrid,
    Text,
    ThemeIcon,
    UnstyledButton
} from "@mantine/core";
import classes from "./Header.module.css";
import {FaChevronDown} from "react-icons/fa";

const modelLinks = [
    {
        icon: MdViewInAr,
        title: "My Designs",
        description: "A collection of some of my blender projects used for 3D printing",
        link: "/models"
    },
]

export const Header = () => {
    const [drawerOpened, {toggle: toggleDrawer, close: closeDrawer}] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

    const links = modelLinks.map((link) => (
        <NavLink to={link.link} key={link.title}>
            <UnstyledButton className={classes.subLink} key={link.title}>

                <Group wrap="nowrap" align={"center"}>

                    <ThemeIcon size={34} variant={"default"} radius={"md"}>
                        <link.icon size={22} color={"#fff"}/>
                    </ThemeIcon>

                    <div>
                        <Text size="sm" fw={500}>
                            {link.title}
                        </Text>
                        <Text size="xs" c="dimmed">
                            {link.description}
                        </Text>
                    </div>
                </Group>
            </UnstyledButton>
        </NavLink>
    ))

    return(
        <Box pb={120}>
            <header className={classes.header}>
                <Group justify={"right"} h="100%">
                    <Group h="100%" gap={0} visibleFrom="sm">
                        <NavLink to={"/"} className={classes.link}>
                            Home
                        </NavLink>
                        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <a href="#" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Stuff & Things
                                        </Box>
                                        <FaChevronDown size={16} />
                                    </Center>
                                </a>
                            </HoverCard.Target>

                            <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                                <Group justify="space-between" px="md">
                                    <Text fw={500}>My Collection of Projects</Text>
                                </Group>

                                <Divider my="sm" />

                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>

                                <div className={classes.dropdownFooter}>
                                    <Group justify="space-between">
                                        <div>
                                        </div>
                                    </Group>
                                </div>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <NavLink to="/about" className={classes.link}>
                            About
                        </NavLink>
                    </Group>

                    <Divider orientation="vertical"/>

                    <Group visibleFrom="sm">
                        <Button variant="default">Log in</Button>
                        <Button>Sign up</Button>
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h="calc(100vh - 80px" mx="-md">

                    <a href="#" className={classes.link}>
                        Home
                    </a>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component="span" mr={5}>
                                Features
                            </Box>
                            <FaChevronDown size={16} />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <a href="#" className={classes.link}>
                        Learn
                    </a>
                    <a href="#" className={classes.link}>
                        Academy
                    </a>

                    <Group justify="center" grow pb="xl" px="md">
                        <Button variant="default">Log in</Button>
                        <Button>Sign up</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    )
}