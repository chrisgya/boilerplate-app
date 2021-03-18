import React from 'react'
import cx from "classnames";
import Link from "next/link";
import { FontAwesomeIcon, faHome, faBars, faTimes } from '../../utils/svgs';


function SideBar() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <aside className="relative hidden h-screen text-gray-600 bg-white border-r shadow-xl sm:block">
            <nav className={cx("text-base font-semibold", isOpen && " w-56")}>
                <div onClick={() => setIsOpen(prv => !prv)} className="flex items-center justify-center py-2 mb-4 border-t-2 border-b-2 cursor-pointer">
                    {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
                </div>

                <Link href="/">
                    <a className={cx("flex items-center py-2 hover:opacity-100 nav-item", isOpen ? "ml-3" : "justify-center px-2")}>
                        <span data-tip={isOpen ? undefined : "Home"}><FontAwesomeIcon icon={faHome} /></span>  {isOpen && <span className="ml-2">Home</span>}
                    </a>
                </Link>
                <Link href="/admin/role-mgt">
                    <a className={cx("flex items-center py-2 hover:opacity-100 nav-item", isOpen ? "ml-3" : "justify-center px-2")}>

                        <span data-tip={isOpen ? undefined : "Role Management"}><FontAwesomeIcon icon={faHome} /></span>  {isOpen && <span className="ml-2">Role Mgt</span>}
                    </a>
                </Link>
                <Link href="/admin/permission-mgt">
                    <a className={cx("flex items-center py-2 hover:opacity-100 nav-item", isOpen ? "ml-3" : "justify-center px-2")}>
                        <span data-tip={isOpen ? undefined : "Permission Management"}><FontAwesomeIcon icon={faHome} /></span>  {isOpen && <span className="ml-2">Permission Mgt</span>}
                    </a>
                </Link>
                <Link href="/admin/account-mgt" >
                    <a className={cx("flex items-center py-2 hover:opacity-100 nav-item", isOpen ? "ml-3" : "justify-center px-2")}>
                        <span data-tip={isOpen ? undefined : "Accounts Management"}><FontAwesomeIcon icon={faHome} /></span>  {isOpen && <span className="ml-2">Accounts Mgt</span>}
                    </a>
                </Link>
            </nav>
            <Link href="/">
                <a className="absolute bottom-0 flex items-center justify-center w-full py-4 active-nav-link">
                    <span data-tip={isOpen ? undefined : "Last Item"}><FontAwesomeIcon icon={faHome} /></span>  {isOpen && <span className="ml-2">Last Item</span>}
                </a>
            </Link>
        </aside>

    )
}

export default SideBar
