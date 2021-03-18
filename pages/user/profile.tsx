import React from 'react';
import cx from "classnames";
import {
    PhotoUpload,
    ChangePasswordForm,
    DetailsForm,
    UsernameForm,
    EmailForm,
    UserRoles,
    TabHeader,
    Button,
    AuthenticatedLayout
} from '../../components';
import useMe from '../../hooks/useMe';

function Profile() {

    const [openTab, setOpenTab] = React.useState(1);
    const [profileSideBar, setProfileSideBar] = React.useState(1);
    const [isProfilePhotoEditing, setIsProfilePhotoEditing] = React.useState(false);

    const { isSuccess, data } = useMe();

    return (
        <AuthenticatedLayout>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <ul className="flex flex-row flex-wrap pt-1 pb-1 mb-0 list-none" role="tablist">
                        <TabHeader tabName="Profile" tabNumber={1} openTab={openTab} href="#link1" onTab={e => { e.preventDefault(); setOpenTab(1); }} />
                        <TabHeader tabName="Settings" tabNumber={2} openTab={openTab} href="#link2" onTab={e => { e.preventDefault(); setOpenTab(2); }} />
                        <TabHeader tabName="Options" tabNumber={3} openTab={openTab} href="#link3" onTab={e => { e.preventDefault(); setOpenTab(3); }} />
                    </ul>
                    <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg">
                        <div className="flex-auto px-4 py-5">
                            <div className="tab-content tab-space">
                                <div className={cx("flex", openTab === 1 ? "block" : "hidden")} id="link1">

                                    <div className="w-3/4 mr-3">
                                        {profileSideBar === 1 && <div>
                                            {isProfilePhotoEditing ?
                                                <PhotoUpload clearEditing={() => setIsProfilePhotoEditing(false)} /> :
                                                <div>
                                                    <img
                                                        className="mx-auto mb-4 shadow-lg h-44"
                                                        src={isSuccess && data?.pictureUrl ? `${process.env.NEXT_PUBLIC_FILE_PREVIEW_URL}/${data?.pictureUrl}` : '/images/user.svg'}
                                                        alt=""
                                                    />
                                                    <Button type="button" name="Edit" onClick={() => setIsProfilePhotoEditing(true)} />
                                                </div>

                                            }
                                        </div>}
                                        {profileSideBar === 2 && <div><UsernameForm /> <EmailForm /> <DetailsForm /></div>}
                                        {profileSideBar === 3 && <div><UserRoles /></div>}
                                        {profileSideBar === 4 && <div><ChangePasswordForm /></div>}

                                    </div>
                                    <div className="w-1/4 px-4 py-2 text-gray-700 border-l-2 border-gray-100">
                                        <ul>
                                            <li onClick={() => setProfileSideBar(1)} className={cx("profile-side-bar", profileSideBar === 1 && "profile-side-bar-active")}>Photo</li>
                                            <li onClick={() => setProfileSideBar(2)} className={cx("profile-side-bar", profileSideBar === 2 && "profile-side-bar-active")}>Details</li>
                                            <li onClick={() => setProfileSideBar(3)} className={cx("profile-side-bar", profileSideBar === 3 && "profile-side-bar-active")}>Roles & Permissions</li>
                                            <li onClick={() => setProfileSideBar(4)} className={cx("profile-side-bar", profileSideBar === 4 && "profile-side-bar-active")}>Change Password</li>
                                        </ul>

                                    </div>

                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <p>Tab 2 Content</p>
                                </div>
                                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                    <p>Tab 3 Content</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Profile;
