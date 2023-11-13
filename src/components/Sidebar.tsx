import {FC} from 'react';
import styles from '../styles/components/sidebar.module.css';
import {NavLink} from 'react-router-dom';
import {AiOutlineHome} from 'react-icons/ai'
import {GiHospitalCross} from 'react-icons/gi'
import {LiaHeartbeatSolid} from 'react-icons/lia'
import {TbBuildingHospital} from 'react-icons/tb'
import {BsInstagram} from 'react-icons/bs'
import {FiGithub} from 'react-icons/fi'

type Props = {}

const Sidebar: FC<Props> = ({}): JSX.Element => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <GiHospitalCross className={styles.icon} /> MediTrack
            </div>
            <nav className={styles.navigation}>
                <NavLink to='/'>
                    <div className={styles.icon}>
                        <AiOutlineHome />
                    </div> Dashbord
                </NavLink>
                <NavLink to='/patient'>
                    <div className={styles.icon}>
                        <LiaHeartbeatSolid />
                    </div>
                    Patient
                </NavLink>
                <NavLink to='/ward'>
                    <div className={styles.icon}>
                        <TbBuildingHospital />
                    </div>
                    Ward
                </NavLink>
            </nav>
            <div className={styles.social}>
                <a href="https://www.instagram.com/mishrank_mkp25675/" target='_blank' rel='noreferer noopener'>
                    <BsInstagram />
                </a>
                <a href="https://github.com/niketvns" target='_blank' rel='noreferer noopener'>
                    <FiGithub />
                </a>
            </div>
        </aside>
    )
}

export default Sidebar;