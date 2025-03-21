// app/camera-page/components/Navigation.js
import { Drawer, Text } from "@mantine/core";
import { User, History, Settings, LogOut } from "lucide-react";

export default function Navigation({ navOpen, setNavOpen }: any) {
  const NavItem = ({ icon, label, onClick }: any) => (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full py-3 px-4 hover:bg-gray-100 rounded-md transition-colors"
    >
      {icon}
      <Text size="md">{label}</Text>
    </button>
  );

  return (
    <Drawer
      opened={navOpen}
      onClose={() => setNavOpen(false)}
      title="Menu"
      position="right"
      size="md"
      classNames={{
        title: "text-xl font-semibold",
        body: "py-4",
      }}
    >
      <div className="flex flex-col gap-1 mt-4">
        <NavItem
          icon={<User size={20} className="text-gray-600" />}
          label="Account"
          onClick={() => console.log("Account clicked")}
        />
        <NavItem
          icon={<History size={20} className="text-gray-600" />}
          label="History"
          onClick={() => console.log("History clicked")}
        />
        <NavItem
          icon={<Settings size={20} className="text-gray-600" />}
          label="Settings"
          onClick={() => console.log("Settings clicked")}
        />
        <div className="h-px bg-gray-200 my-2" />
        <NavItem
          icon={<LogOut size={20} className="text-red-500" />}
          label="Logout"
          onClick={() => console.log("Logout clicked")}
        />
      </div>
    </Drawer>
  );
}
