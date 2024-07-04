import { HeaderContainer } from "./styles";
import logo from '../../assets/image-ignite.svg'
import { LuClock11 } from "react-icons/lu";
import { FaListCheck } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export function Header() {
    return (
        <HeaderContainer>
            <img src={logo} alt=""/>
            <nav>
                <NavLink  to={'/'} title="Tempo">
                    <LuClock11 size={24}></LuClock11>
                </NavLink>
                <NavLink to={'/history'} title="Histórico">
                    <FaListCheck size={24}></FaListCheck>
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}