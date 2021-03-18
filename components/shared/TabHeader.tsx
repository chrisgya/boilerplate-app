interface Iprop {
    tabNumber: number;
    openTab: number;
    href: string;
    tabName: string;
    onTab: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const TabHeader = ({ tabName, tabNumber, openTab, href, onTab }: Iprop) => {
    return (
        <li className="flex-auto mr-2 -mb-px text-center last:mr-0">
            <a className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === tabNumber
                    ? "text-white bg-blue-600"
                    : "text-blue-600 bg-white")
            }
                onClick={onTab}
                data-toggle="tab"
                href={href}
                role="tablist" >
                {tabName}
            </a>
        </li>
    )
}

export default TabHeader
