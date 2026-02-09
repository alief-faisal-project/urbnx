interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerIcon = ({ isOpen, onClick }: HamburgerIconProps) => {
  return (
    <button
      className="p-2 hover:bg-secondary/50 transition-colors relative w-10 h-10 flex items-center justify-center"
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <div className="w-6 h-5 relative flex flex-col justify-center items-center">
        {/* Top bar */}
        <span
          className={`absolute h-0.5 w-6 bg-foreground transform transition-all duration-300 ease-out ${
            isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
          }`}
        />
        {/* Middle bar */}
        <span
          className={`absolute h-0.5 w-6 bg-foreground transition-all duration-300 ease-out ${
            isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
          }`}
        />
        {/* Bottom bar */}
        <span
          className={`absolute h-0.5 w-6 bg-foreground transform transition-all duration-300 ease-out ${
            isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
          }`}
        />
      </div>
    </button>
  );
};

export default HamburgerIcon;
