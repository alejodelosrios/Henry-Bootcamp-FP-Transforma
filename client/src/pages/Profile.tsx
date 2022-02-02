import React, {FC} from 'react';

import {UserProfile} from '../components/UserProfile/Profile';
import {CompanyProfile} from '../components/CompanyProfile/CompanyProfile';
import {useSelector} from 'react-redux';
import Dashboard from './Dashboard/Dashboard';
//* navbar, info de contacto(tarjeta con info del usuario), experiencia, educacion, idiomas, similar a info de contacto, todo editable
interface Props {
    user: any
}
export const Profile: FC<Props> = ({user}) => {
    const role = useSelector((state: any) => state.userReducer.role)
    return (
        <Dashboard>
            <UserProfile />
            {/* {
                role === 'applicant' ? <UserProfile/>
                    :
                    <CompanyProfile/>
            } */}
        </Dashboard>
    )
}
