import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
import logo from "@/assets/logo_urbnx.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "Backpack", path: "/shop?category=backpack" },
      { name: "T-Shirt", path: "/shop?category=tshirt" },
      { name: "Hoodie", path: "/shop?category=hoodie" },
      { name: "Accessories", path: "/shop?category=accessories" },
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "FAQ", path: "/faq" },
      { name: "Size Guide", path: "/size-guide" },
    ],
    legal: [{ name: "Privacy Policy", path: "/privacy-policy" }],
  };

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com/urbnx",
      label: "Instagram",
    },
    { icon: Facebook, href: "https://facebook.com/urbnx", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/urbnx", label: "Twitter" },
  ];

  return (
    <footer className="bg-white text-primary">
      <div className="container-brand section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <img src={logo} alt="URBNX Logo" className="h-10 w-auto invert" />
            <p className="text-primary text-sm leading-relaxed max-w-sm">
              Be Authentic In Your Own Style. URBNX adalah brand fashion
              streetwear Indonesia yang mengutamakan kualitas, keaslian, dan
              eksklusivitas.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid - 3 columns on mobile */}
          <div className="grid grid-cols-3 gap-4 lg:col-span-3 lg:grid-cols-3 lg:gap-10">
            {/* Shop Links */}
            <div>
              <h4 className="font-display text-sm md:text-lg uppercase tracking-wider mb-3 md:mb-4">
                Shop
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-xs md:text-sm text-primary hover:text-primary/70 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-display text-sm md:text-lg uppercase tracking-wider mb-3 md:mb-4">
                Company
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-xs md:text-sm text-primary hover:text-primary/70 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-display text-sm md:text-lg uppercase tracking-wider mb-3 md:mb-4">
                Legal
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-xs md:text-sm text-primary hover:text-primary/70 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary flex justify-center items-center">
          <p className="text-sm text-primary">
            © {currentYear} URBNX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
