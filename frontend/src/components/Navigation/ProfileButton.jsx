import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import {logout} from "../../store/session"
import { Link, useNavigate } from "react-router-dom";


const ProfileButton = ({ user }) => {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false)
    const dropdownRef = useRef(null);
    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());

    };

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
        navigate('/')
  };

    useEffect(() => {
        if (!showMenu) return
        
        const closeMenu = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);


    return (
    <>
      <button onClick={toggleMenu}>{user.username}</button>
      {showMenu && (
      <ul ref={dropdownRef}>
        <li>
          <Link to={`/profile`} state={{ user: user }}>Go to Profile</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Log Out</button>
        </li>
      </ul>
      )}
    </>
  );
}

export default ProfileButton