
interface LinkProps {
  children: React.ReactNode;
  isNavLinkHovered?: boolean;
  className?: string;
}

const Link: React.FC<LinkProps> = ({ children, isNavLinkHovered, className = '' }) => {
    return (<>
        <span className={`relative font-thin  `}>
            {children}
            <span
                className={`bg-repeat-x pointer-events-none absolute left-0 -bottom-[1px] h-[1px] w-full bg-white transform transition-transform duration-500 ease-in-out ${className} ${isNavLinkHovered ? "scale-x-100 origin-left" : "scale-x-0 origin-right"
                    }`}
            />
        </span></>)
}
export default Link;
