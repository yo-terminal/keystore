import { ConnectButton } from "@mysten/dapp-kit";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useLocation, Outlet, useParams, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
  SidebarLayout,
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@trade-project/ui-toolkit";
import {
  HomeIcon,
  AtSymbolIcon,
  ArrowTurnLeftUpIcon,
  Cog6ToothIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";
import Logo from "./Logo";
import { useAppSelector, useBook } from "../../../app/hooks";

export function Layout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const archive = useAppSelector((state) => state.app.archive);
  const { id } = useParams();
  const slotId = String(id);
  const book = useBook();
  const parents = (book.parents[slotId] || []).filter(
    (x) => !!x.archive === archive
  );

  return (
    <SidebarLayout
      sidebar={
        <Sidebar>
          <SidebarHeader>
            {/* <SidebarItem href="/">
              <Logo />
              <SidebarLabel>Keystore</SidebarLabel>
            </SidebarItem> */}
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Logo />
                <SidebarLabel>Keystore</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu
                className="min-w-80 lg:min-w-64"
                anchor="bottom start"
              >
                <DropdownItem href="/">
                  <Logo />
                  <DropdownLabel className="pl-3">Keystore</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="https://terminal.mobi">
                  <HomeIcon />
                  <DropdownLabel>Home</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem
                current={pathname === "/"}
                onClick={() => {
                  navigate("/");
                }}
              >
                <AtSymbolIcon />
                <SidebarLabel>Root</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            {parents.length > 0 && (
              <SidebarSection>
                <SidebarHeading>Parents</SidebarHeading>
                {parents.map((x) => (
                  <SidebarItem
                    key={x.id}
                    onClick={() => {
                      navigate(`/slot/${x.id}`);
                    }}
                  >
                    <ArrowTurnLeftUpIcon />
                    <span className="truncate">{x.summary}</span>
                  </SidebarItem>
                ))}
              </SidebarSection>
            )}

            <SidebarSpacer />
            <SidebarSection>
              <SidebarItem
                onClick={() => {
                  alert("In Development...");
                }}
              >
                <Cog6ToothIcon />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                onClick={() => {
                  alert("In Development...");
                }}
              >
                <SparklesIcon />
                <SidebarLabel>Donate</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="connect-button">
            <ConnectButton />
          </SidebarFooter>
        </Sidebar>
      }
    >
      <Outlet />
    </SidebarLayout>
  );
}
