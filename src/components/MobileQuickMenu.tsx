import { Link } from "react-router-dom";
import { ShoppingBag, Ruler, Flame, Heart } from "lucide-react";
interface QuickMenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  action?: string;
}
const menuItems: QuickMenuItem[] = [
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    label: "Shop",
    path: "/shop",
  },
  {
    icon: <Ruler className="w-6 h-6" />,
    label: "Size Guide",
    path: "/size-guide",
  },
  {
    icon: <Flame className="w-6 h-6" />,
    label: "Terlaris",
    path: "#terlaris",
    action: "scroll",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    label: "Favorit",
    path: "#favorit",
    action: "scroll",
  },
];
const MobileQuickMenu = () => {
  const handleClick = (item: QuickMenuItem, e: React.MouseEvent) => {
    if (item.action === "scroll") {
      e.preventDefault();
      const element = document.querySelector(item.path);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <section className="md:hidden bg-background py-4 border-b border-border">
      <div className="container-brand">
        <div className="grid grid-cols-4 gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={(e) => handleClick(item, e)}
              className="flex flex-col items-center justify-center gap-2 p-3 bg-secondary/30 hover:bg-secondary/60 transition-colors rounded-lg"
            >
              <div className="text-foreground">{item.icon}</div>
              <span className="text-xs font-medium text-foreground uppercase tracking-wide">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default MobileQuickMenu;
