import Image from "next/image";
import './index.scss';

const Navbar = () => {
  return (
    <div className="navbar min-h-screen">
      <div className="navbarTop">
        <a className="link-logo" href="https://www.soyhenry.com/">
          <Image src="/logo.svg" alt="logo" width={40} height={24}/>
        </a>
        <div className="navbarSection">
          <a className="_NavBarItem" href="#">
            <Image src="/board.svg" alt="logo" width={24} height={24}/>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar;