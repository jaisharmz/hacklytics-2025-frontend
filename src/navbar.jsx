const navItems = [
  { label: "Clusters", href: "#Clusters" },
  { label: "Graphs", href: "#Graphs" },
  { label: "Connections", href: "#Connections" },
];
export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="pt-4 pb-4">
        <div className="flex p-8 justify-between items-start w-full">
          <span className="text-2xl tracking-light">Jack Street</span>
          <ul className="lg:flex">
            {navItems.map((item, ix) => {
              return (
                <li className="list-none" key={ix}>
                  <a
                    className="px-4 hover:bg-opacity-50 hover:text-2xl transition-shadow hover:rounded-lg duration-300 hover:shadow-[0_4px_15px_rgba(255,255,255,0.2)]"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
