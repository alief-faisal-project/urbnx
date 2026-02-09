interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerIcon = ({ isOpen, onClick }: HamburgerIconProps) => {
  return (
    <button
      className="p-2 transition-colors relative w-10 h-10 flex items-center justify-center"
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <div className="w-6 h-5 relative flex flex-col justify-center items-center">
        {/* Top bar */}
        <span
          className={`absolute h-[2.5px] w-6 bg-foreground rounded-sm transform transition-all duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] origin-center ${
            isOpen ? "rotate-45 translate-y-0" : "-translate-y-[7px]"
          }`}
        />
        {/* Middle bar */}
        <span
          className={`absolute h-[2.5px] w-6 bg-foreground rounded-sm transition-all duration-300 ease-out ${
            isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
          }`}
        />
        {/* Bottom bar */}
        <span
          className={`absolute h-[2.5px] w-6 bg-foreground rounded-sm transform transition-all duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] origin-center ${
            isOpen ? "-rotate-45 translate-y-0" : "translate-y-[7px]"
          }`}
        />
      </div>
    </button>
  );
};

export default HamburgerIcon;
